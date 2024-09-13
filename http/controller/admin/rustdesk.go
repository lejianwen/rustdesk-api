package admin

import (
	"Gwen/global"
	"Gwen/http/response"
	"github.com/gin-gonic/gin"
)

type Rustdesk struct {
}

// ServerConfig 服务配置
// @Tags ADMIN
// @Summary 服务配置
// @Description 服务配置,给webclient提供api-server
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/server-config [get]
// @Security token
func (r *Rustdesk) ServerConfig(c *gin.Context) {
	cf := &response.ServerConfigResponse{
		IdServer:    global.Config.Rustdesk.IdServer,
		Key:         global.Config.Rustdesk.Key,
		RelayServer: global.Config.Rustdesk.RelayServer,
		ApiServer:   global.Config.Rustdesk.ApiServer,
	}
	response.Success(c, cf)
}
