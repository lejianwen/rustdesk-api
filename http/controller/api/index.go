package api

import (
	requstform "Gwen/http/request/api"
	"Gwen/http/response"
	"Gwen/model"
	"Gwen/service"
	"Gwen/global"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
	"strings"
)

type Index struct {
}

// Index 首页
// @Tags 首页
// @Summary 首页
// @Description 首页
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router / [get]
func (i *Index) Index(c *gin.Context) {
	response.Success(
		c,
		"Hello Gwen",
	)
}

// Heartbeat 心跳
// @Tags 首页
// @Summary 心跳
// @Description 心跳
// @Accept  json
// @Produce  json
// @Success 200 {object} nil
// @Failure 500 {object} response.Response
// @Router /heartbeat [post]
func (i *Index) Heartbeat(c *gin.Context) {
	info := &requstform.PeerInfoInHeartbeat{}
	err := c.ShouldBindJSON(info)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{})
		return
	}
	if info.Uuid == "" {
		c.JSON(http.StatusOK, gin.H{})
		return
	}
	peer := service.AllService.PeerService.FindByUuid(info.Uuid)
	if peer == nil || peer.RowId == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}
	//如果在40s以内则不更新
	if time.Now().Unix()-peer.LastOnlineTime > 40 {
		upp := &model.Peer{RowId: peer.RowId, LastOnlineTime: time.Now().Unix(), LastOnlineIp: GetRealIp(c)}
		service.AllService.PeerService.Update(upp)
	}
	c.JSON(http.StatusOK, gin.H{})
}

// Helper function: Get the real IP address of the client
func GetRealIp(c *gin.Context) string {
	// 获取自定义 IP 头配置
	ipHeader := strings.TrimSpace(global.Config.Misc.IpHeader)
	// 使用 "go" 表示直接通过 c.ClientIP() 获取 IP
	if strings.ToLower(ipHeader) == "go" {
		return c.ClientIP()
	}
	if ipHeader == "" {
		ipHeader = "X-Forwarded-For"
	}
	// 获取 IP 头信息
	header := c.Request.Header.Get(ipHeader)
	if header == "" {
		return c.ClientIP()
	}
	// 如果有多个 IP，取第一个 IP，并删除首尾空白
	return strings.TrimSpace(strings.Split(header, ",")[0])
}