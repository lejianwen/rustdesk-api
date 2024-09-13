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
// @Security BearerAuth
func (p *Peer) SysInfo(c *gin.Context) {
	f := &requstform.PeerForm{}
	err := c.ShouldBindBodyWith(f, binding.JSON)
	if err != nil {
		response.Error(c, err.Error())
		return
	}

	pe := service.AllService.PeerService.FindById(f.Id)
	if pe == nil || pe.RowId == 0 {
		pe = f.ToPeer()
		err = service.AllService.PeerService.Create(pe)
		if err != nil {
			response.Error(c, err.Error())
			return
		}
	}

	//SYSINFO_UPDATED 上传成功
	//ID_NOT_FOUND 下次心跳会上传
	//直接响应文本
	c.String(http.StatusOK, "")
}
