package my

import (
	"github.com/gin-gonic/gin"
	"github.com/lejianwen/rustdesk-api/global"
	"github.com/lejianwen/rustdesk-api/http/request/admin"
	"github.com/lejianwen/rustdesk-api/http/response"
	"github.com/lejianwen/rustdesk-api/service"
	"gorm.io/gorm"
)

type ShareRecord struct {
}

// List 分享记录列表
// @Tags 我的分享记录
// @Summary 分享记录列表
// @Description 分享记录列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param page_size query int false "页大小"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/my/share_record/list [get]
// @Security token
func (sr *ShareRecord) List(c *gin.Context) {
	query := &admin.PageQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	res := service.AllService.ShareRecordService.List(query.Page, query.PageSize, func(tx *gorm.DB) {
		tx.Where("user_id = ?", u.Id)
	})
	response.Success(c, res)
}

// Delete 分享记录删除
// @Tags 我的分享记录
// @Summary 分享记录删除
// @Description 分享记录删除
// @Accept  json
// @Produce  json
// @Param body body admin.ShareRecordForm true "分享记录信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/my/share_record/delete [post]
// @Security token
func (sr *ShareRecord) Delete(c *gin.Context) {
	f := &admin.ShareRecordForm{}
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
	u := service.AllService.UserService.CurUser(c)
	i := service.AllService.ShareRecordService.InfoById(f.Id)
	if i.UserId != u.Id {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	if i.Id == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	err := service.AllService.ShareRecordService.Delete(i)
	if err == nil {
		response.Success(c, nil)
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
}

// BatchDelete 批量删除我的分享记录
// @Tags 我的
// @Summary 批量删除我的分享记录
// @Description 批量删除我的分享记录
// @Accept  json
// @Produce  json
// @Param body body admin.PeerShareRecordBatchDeleteForm true "id"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/my/share_record/batchDelete [post]
// @Security token
func (sr *ShareRecord) BatchDelete(c *gin.Context) {
	f := &admin.PeerShareRecordBatchDeleteForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	if len(f.Ids) == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	u := service.AllService.UserService.CurUser(c)
	var l int64
	l = int64(len(f.Ids))
	res := service.AllService.ShareRecordService.List(1, uint(l), func(tx *gorm.DB) {
		tx.Where("user_id = ?", u.Id)
		tx.Where("id in ?", f.Ids)
	})
	if res.Total != l {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	err := service.AllService.ShareRecordService.BatchDelete(f.Ids)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, nil)
}
