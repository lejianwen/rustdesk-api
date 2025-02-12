package my

import (
	"github.com/gin-gonic/gin"
	"github.com/lejianwen/rustdesk-api/global"
	"github.com/lejianwen/rustdesk-api/http/request/admin"
	"github.com/lejianwen/rustdesk-api/http/response"
	"github.com/lejianwen/rustdesk-api/model"
	"github.com/lejianwen/rustdesk-api/service"
	"gorm.io/gorm"
)

type LoginLog struct {
}

// List 列表
// @Tags 我的登录日志
// @Summary 登录日志列表
// @Description 登录日志列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param page_size query int false "页大小"
// @Param user_id query int false "用户ID"
// @Success 200 {object} response.Response{data=model.LoginLogList}
// @Failure 500 {object} response.Response
// @Router /admin/my/login_log/list [get]
// @Security token
func (ct *LoginLog) List(c *gin.Context) {
	query := &admin.LoginLogQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	res := service.AllService.LoginLogService.List(query.Page, query.PageSize, func(tx *gorm.DB) {
		tx.Where("user_id = ? and is_deleted = ?", u.Id, model.IsDeletedNo)
		tx.Order("id desc")
	})
	response.Success(c, res)
}

// Delete 删除
// @Tags 我的登录日志
// @Summary 登录日志删除
// @Description 登录日志删除
// @Accept  json
// @Produce  json
// @Param body body model.LoginLog true "登录日志信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/my/login_log/delete [post]
// @Security token
func (ct *LoginLog) Delete(c *gin.Context) {
	f := &model.LoginLog{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	id := f.Id
	errList := global.Validator.ValidVar(c, id, "required,gt=0")
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	l := service.AllService.LoginLogService.InfoById(f.Id)
	if l.Id == 0 || l.IsDeleted == model.IsDeletedYes {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	u := service.AllService.UserService.CurUser(c)
	if l.UserId != u.Id {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	err := service.AllService.LoginLogService.SoftDelete(l)
	if err == nil {
		response.Success(c, nil)
		return
	}
	response.Fail(c, 101, err.Error())
}

// BatchDelete 删除
// @Tags 我的登录日志
// @Summary 登录日志批量删除
// @Description 登录日志批量删除
// @Accept  json
// @Produce  json
// @Param body body admin.LoginLogIds true "登录日志"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/my/login_log/batchDelete [post]
// @Security token
func (ct *LoginLog) BatchDelete(c *gin.Context) {
	f := &admin.LoginLogIds{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	if len(f.Ids) == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	u := service.AllService.UserService.CurUser(c)
	err := service.AllService.LoginLogService.BatchSoftDelete(u.Id, f.Ids)
	if err == nil {
		response.Success(c, nil)
		return
	}
	response.Fail(c, 101, err.Error())
	return
}
