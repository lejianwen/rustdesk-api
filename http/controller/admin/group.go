package admin

import (
	"Gwen/global"
	"Gwen/http/request/admin"
	"Gwen/http/response"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Group struct {
}

// Detail 群组
// @Tags 群组
// @Summary 群组详情
// @Description 群组详情
// @Accept  json
// @Produce  json
// @Param id path int true "ID"
// @Success 200 {object} response.Response{data=model.Group}
// @Failure 500 {object} response.Response
// @Router /admin/group/detail/{id} [get]
// @Security token
func (ct *Group) Detail(c *gin.Context) {
	id := c.Param("id")
	iid, _ := strconv.Atoi(id)
	u := service.AllService.GroupService.InfoById(uint(iid))
	if u.Id > 0 {
		response.Success(c, u)
		return
	}
	response.Fail(c, 101, "信息不存在")
	return
}

// Create 创建群组
// @Tags 群组
// @Summary 创建群组
// @Description 创建群组
// @Accept  json
// @Produce  json
// @Param body body admin.GroupForm true "群组信息"
// @Success 200 {object} response.Response{data=model.Group}
// @Failure 500 {object} response.Response
// @Router /admin/group/create [post]
// @Security token
func (ct *Group) Create(c *gin.Context) {
	f := &admin.GroupForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, "参数错误")
		return
	}
	errList := global.Validator.ValidStruct(f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := f.ToGroup()
	err := service.AllService.GroupService.Create(u)
	if err != nil {
		response.Fail(c, 101, "创建失败")
		return
	}
	response.Success(c, u)
}

// List 列表
// @Tags 群组
// @Summary 群组列表
// @Description 群组列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param page_size query int false "页大小"
// @Success 200 {object} response.Response{data=model.GroupList}
// @Failure 500 {object} response.Response
// @Router /admin/group/list [get]
// @Security token
func (ct *Group) List(c *gin.Context) {
	query := &admin.PageQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, "参数错误")
		return
	}
	res := service.AllService.GroupService.List(query.Page, query.PageSize, nil)
	response.Success(c, res)
}

// Update 编辑
// @Tags 群组
// @Summary 群组编辑
// @Description 群组编辑
// @Accept  json
// @Produce  json
// @Param body body admin.GroupForm true "群组信息"
// @Success 200 {object} response.Response{data=model.Group}
// @Failure 500 {object} response.Response
// @Router /admin/group/update [post]
// @Security token
func (ct *Group) Update(c *gin.Context) {
	f := &admin.GroupForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, "参数错误")
		return
	}
	if f.Id == 0 {
		response.Fail(c, 101, "参数错误")
		return
	}
	errList := global.Validator.ValidStruct(f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := f.ToGroup()
	err := service.AllService.GroupService.Update(u)
	if err != nil {
		response.Fail(c, 101, "更新失败")
		return
	}
	response.Success(c, nil)
}

// Delete 删除
// @Tags 群组
// @Summary 群组删除
// @Description 群组删除
// @Accept  json
// @Produce  json
// @Param body body admin.GroupForm true "群组信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/group/delete [post]
// @Security token
func (ct *Group) Delete(c *gin.Context) {
	f := &admin.GroupForm{}
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
	u := service.AllService.GroupService.InfoById(f.Id)
	if u.Id > 0 {
		err := service.AllService.GroupService.Delete(u)
		if err == nil {
			response.Success(c, nil)
			return
		}
		response.Fail(c, 101, err.Error())
		return
	}
	response.Fail(c, 101, "信息不存在")
}
