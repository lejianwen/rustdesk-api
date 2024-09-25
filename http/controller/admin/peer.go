package admin

import (
	"Gwen/global"
	"Gwen/http/request/admin"
	"Gwen/http/response"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Peer struct {
}

// Detail 设备
// @Tags 设备
// @Summary 设备详情
// @Description 设备详情
// @Accept  json
// @Produce  json
// @Param id path int true "ID"
// @Success 200 {object} response.Response{data=model.Peer}
// @Failure 500 {object} response.Response
// @Router /admin/peer/detail/{id} [get]
// @Security token
func (ct *Peer) Detail(c *gin.Context) {
	id := c.Param("id")
	iid, _ := strconv.Atoi(id)
	u := service.AllService.PeerService.InfoByRowId(uint(iid))
	if u.RowId > 0 {
		response.Success(c, u)
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
	return
}

// Create 创建设备
// @Tags 设备
// @Summary 创建设备
// @Description 创建设备
// @Accept  json
// @Produce  json
// @Param body body admin.PeerForm true "设备信息"
// @Success 200 {object} response.Response{data=model.Peer}
// @Failure 500 {object} response.Response
// @Router /admin/peer/create [post]
// @Security token
func (ct *Peer) Create(c *gin.Context) {
	f := &admin.PeerForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := f.ToPeer()
	err := service.AllService.PeerService.Create(u)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, u)
}

// List 列表
// @Tags 设备
// @Summary 设备列表
// @Description 设备列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param page_size query int false "页大小"
// @Success 200 {object} response.Response{data=model.PeerList}
// @Failure 500 {object} response.Response
// @Router /admin/peer/list [get]
// @Security token
func (ct *Peer) List(c *gin.Context) {
	query := &admin.PageQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	res := service.AllService.PeerService.List(query.Page, query.PageSize, nil)
	response.Success(c, res)
}

// Update 编辑
// @Tags 设备
// @Summary 设备编辑
// @Description 设备编辑
// @Accept  json
// @Produce  json
// @Param body body admin.PeerForm true "设备信息"
// @Success 200 {object} response.Response{data=model.Peer}
// @Failure 500 {object} response.Response
// @Router /admin/peer/update [post]
// @Security token
func (ct *Peer) Update(c *gin.Context) {
	f := &admin.PeerForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	if f.RowId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := f.ToPeer()
	err := service.AllService.PeerService.Update(u)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, nil)
}

// Delete 删除
// @Tags 设备
// @Summary 设备删除
// @Description 设备删除
// @Accept  json
// @Produce  json
// @Param body body admin.PeerForm true "设备信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/peer/delete [post]
// @Security token
func (ct *Peer) Delete(c *gin.Context) {
	f := &admin.PeerForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	id := f.RowId
	errList := global.Validator.ValidVar(c, id, "required,gt=0")
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	u := service.AllService.PeerService.InfoByRowId(f.RowId)
	if u.RowId > 0 {
		err := service.AllService.PeerService.Delete(u)
		if err == nil {
			response.Success(c, nil)
			return
		}
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
}
