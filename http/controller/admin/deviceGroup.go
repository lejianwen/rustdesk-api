package admin

import (
	"github.com/gin-gonic/gin"
	"github.com/lejianwen/rustdesk-api/v2/global"
	"github.com/lejianwen/rustdesk-api/v2/http/request/admin"
	"github.com/lejianwen/rustdesk-api/v2/http/response"
	"github.com/lejianwen/rustdesk-api/v2/service"
	"strconv"
)

type DeviceGroup struct {
}

// Detail 设备群组
// @Tags 设备群组
// @Summary 设备群组详情
// @Description 设备群组详情
// @Accept  json
// @Produce  json
// @Param id path int true "ID"
// @Success 200 {object} response.Response{data=model.Group}
// @Failure 500 {object} response.Response
// @Router /admin/device_group/detail/{id} [get]
// @Security token
func (ct *DeviceGroup) Detail(c *gin.Context) {
	id := c.Param("id")
	iid, _ := strconv.Atoi(id)
	u := service.AllService.GroupService.DeviceGroupInfoById(uint(iid))
	if u.Id > 0 {
		response.Success(c, u)
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
	return
}

// Create 创建设备群组
// @Tags 设备群组
// @Summary 创建设备群组
// @Description 创建设备群组
// @Accept  json
// @Produce  json
// @Param body body admin.DeviceGroupForm true "设备群组信息"
// @Success 200 {object} response.Response{data=model.DeviceGroup}
// @Failure 500 {object} response.Response
// @Router /admin/device_group/create [post]
// @Security token
func (ct *DeviceGroup) Create(c *gin.Context) {
	f := &admin.DeviceGroupForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := f.ToDeviceGroup()
	err := service.AllService.GroupService.DeviceGroupCreate(u)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, nil)
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
// @Router /admin/device_group/list [get]
// @Security token
func (ct *DeviceGroup) List(c *gin.Context) {
	query := &admin.PageQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	res := service.AllService.GroupService.DeviceGroupList(query.Page, query.PageSize, nil)
	response.Success(c, res)
}

// Update 编辑
// @Tags 设备群组
// @Summary 设备群组编辑
// @Description 设备群组编辑
// @Accept  json
// @Produce  json
// @Param body body admin.DeviceGroupForm true "群组信息"
// @Success 200 {object} response.Response{data=model.Group}
// @Failure 500 {object} response.Response
// @Router /admin/device_group/update [post]
// @Security token
func (ct *DeviceGroup) Update(c *gin.Context) {
	f := &admin.DeviceGroupForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	if f.Id == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := f.ToDeviceGroup()
	err := service.AllService.GroupService.DeviceGroupUpdate(u)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, nil)
}

// Delete 删除
// @Tags 设备群组
// @Summary 设备群组删除
// @Description 设备群组删除
// @Accept  json
// @Produce  json
// @Param body body admin.DeviceGroupForm true "群组信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/device_group/delete [post]
// @Security token
func (ct *DeviceGroup) Delete(c *gin.Context) {
	f := &admin.DeviceGroupForm{}
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
	u := service.AllService.GroupService.DeviceGroupInfoById(f.Id)
	if u.Id > 0 {
		err := service.AllService.GroupService.DeviceGroupDelete(u)
		if err == nil {
			response.Success(c, nil)
			return
		}
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
}
