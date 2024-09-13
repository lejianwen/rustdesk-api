package admin

import (
	"Gwen/global"
	"Gwen/http/request/admin"
	"Gwen/http/response"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"strconv"
)

type Tag struct {
}

// Detail 标签
// @Tags 标签
// @Summary 标签详情
// @Description 标签详情
// @Accept  json
// @Produce  json
// @Param id path int true "ID"
// @Success 200 {object} response.Response{data=model.Tag}
// @Failure 500 {object} response.Response
// @Router /admin/tag/detail/{id} [get]
// @Security token
func (ct *Tag) Detail(c *gin.Context) {
	id := c.Param("id")
	iid, _ := strconv.Atoi(id)
	t := service.AllService.TagService.InfoById(uint(iid))
	u := service.AllService.UserService.CurUser(c)
	if !service.AllService.UserService.IsAdmin(u) && t.UserId != u.Id {
		response.Fail(c, 101, "无权限")
		return
	}
	if t.Id > 0 {
		response.Success(c, t)
		return
	}
	response.Fail(c, 101, "信息不存在")
	return
}

// Create 创建标签
// @Tags 标签
// @Summary 创建标签
// @Description 创建标签
// @Accept  json
// @Produce  json
// @Param body body admin.TagForm true "标签信息"
// @Success 200 {object} response.Response{data=model.Tag}
// @Failure 500 {object} response.Response
// @Router /admin/tag/create [post]
// @Security token
func (ct *Tag) Create(c *gin.Context) {
	f := &admin.TagForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, "参数错误")
		return
	}
	errList := global.Validator.ValidStruct(f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	t := f.ToTag()
	u := service.AllService.UserService.CurUser(c)
	if !service.AllService.UserService.IsAdmin(u) {
		t.UserId = u.Id
	}
	err := service.AllService.TagService.Create(t)
	if err != nil {
		response.Fail(c, 101, "创建失败")
		return
	}
	response.Success(c, u)
}

// List 列表
// @Tags 标签
// @Summary 标签列表
// @Description 标签列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param page_size query int false "页大小"
// @Param is_my query int false "是否是我的"
// @Param user_id query int false "用户id"
// @Success 200 {object} response.Response{data=model.TagList}
// @Failure 500 {object} response.Response
// @Router /admin/tag/list [get]
// @Security token
func (ct *Tag) List(c *gin.Context) {
	query := &admin.TagQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, "参数错误")
		return
	}
	u := service.AllService.UserService.CurUser(c)
	if !service.AllService.UserService.IsAdmin(u) || query.IsMy == 1 {
		query.UserId = int(u.Id)
	}
	res := service.AllService.TagService.List(query.Page, query.PageSize, func(tx *gorm.DB) {
		if query.UserId > 0 {
			tx.Where("user_id = ?", query.UserId)
		}
	})
	response.Success(c, res)
}

// Update 编辑
// @Tags 标签
// @Summary 标签编辑
// @Description 标签编辑
// @Accept  json
// @Produce  json
// @Param body body admin.TagForm true "标签信息"
// @Success 200 {object} response.Response{data=model.Tag}
// @Failure 500 {object} response.Response
// @Router /admin/tag/update [post]
// @Security token
func (ct *Tag) Update(c *gin.Context) {
	f := &admin.TagForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, "参数错误")
		return
	}
	errList := global.Validator.ValidStruct(f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	if f.Id == 0 {
		response.Fail(c, 101, "参数错误")
		return
	}
	t := f.ToTag()
	u := service.AllService.UserService.CurUser(c)
	if !service.AllService.UserService.IsAdmin(u) && t.UserId != u.Id {
		response.Fail(c, 101, "无权限")
		return
	}
	err := service.AllService.TagService.Update(t)
	if err != nil {
		response.Fail(c, 101, "更新失败")
		return
	}
	response.Success(c, nil)
}

// Delete 删除
// @Tags 标签
// @Summary 标签删除
// @Description 标签删除
// @Accept  json
// @Produce  json
// @Param body body admin.TagForm true "标签信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/tag/delete [post]
// @Security token
func (ct *Tag) Delete(c *gin.Context) {
	f := &admin.TagForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, "系统错误")
		return
	}
	id := f.Id
	errList := global.Validator.ValidVar(id, "required,gt=0")
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	t := service.AllService.TagService.InfoById(f.Id)
	u := service.AllService.UserService.CurUser(c)
	if !service.AllService.UserService.IsAdmin(u) && t.UserId != u.Id {
		response.Fail(c, 101, "无权限")
		return
	}
	if u.Id > 0 {
		err := service.AllService.TagService.Delete(t)
		if err == nil {
			response.Success(c, nil)
			return
		}
		response.Fail(c, 101, err.Error())
		return
	}
	response.Fail(c, 101, "信息不存在")
}
