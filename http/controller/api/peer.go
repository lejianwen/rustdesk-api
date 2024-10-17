package api

import (
	requstform "Gwen/http/request/api"
	"Gwen/http/response"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
)

type Peer struct {
}

// SysInfo
// @Tags 地址
// @Summary 提交系统信息
// @Description 提交系统信息
// @Accept  json
// @Produce  json
// @Param body body requstform.PeerForm true "系统信息表单"
// @Success 200 {string} string "SYSINFO_UPDATED,ID_NOT_FOUND"
// @Failure 500 {object} response.ErrorResponse
// @Router /sysinfo [post]
func (p *Peer) SysInfo(c *gin.Context) {
	f := &requstform.PeerForm{}
	err := c.ShouldBindBodyWith(f, binding.JSON)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	fpe := f.ToPeer()
	pe := service.AllService.PeerService.FindById(f.Id)
	if pe.RowId == 0 {
		pe = f.ToPeer()
		pe.UserId = service.AllService.UserService.FindLatestUserIdFromLoginLogByUuid(pe.Uuid)
		err = service.AllService.PeerService.Create(pe)
		if err != nil {
			response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
			return
		}
	} else {
		if pe.UserId == 0 {
			pe.UserId = service.AllService.UserService.FindLatestUserIdFromLoginLogByUuid(pe.Uuid)
		}
		fpe.RowId = pe.RowId
		fpe.UserId = pe.UserId
		err = service.AllService.PeerService.Update(fpe)
		if err != nil {
			response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
			return
		}
	}
	//SYSINFO_UPDATED 上传成功
	//ID_NOT_FOUND 下次心跳会上传
	//直接响应文本
	c.String(http.StatusOK, "SYSINFO_UPDATED")
}
