package api

import (
	"Gwen/global"
	"Gwen/http/response"
	"Gwen/http/response/api"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"time"
)

type WebClient struct {
}

// ServerConfig 服务配置
// @Tags WEBCLIENT
// @Summary 服务配置
// @Description 服务配置,给webclient提供api-server
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /server-config [get]
// @Security token
func (i *WebClient) ServerConfig(c *gin.Context) {
	u := service.AllService.UserService.CurUser(c)

	peers := map[string]*api.WebClientPeerPayload{}
	abs := service.AllService.AddressBookService.ListByUserIdAndCollectionId(u.Id, 0, 1, 100)
	for _, ab := range abs.AddressBooks {
		pp := &api.WebClientPeerPayload{}
		pp.FromAddressBook(ab)
		peers[ab.Id] = pp
	}
	response.Success(
		c,
		gin.H{
			"id_server": global.Config.Rustdesk.IdServer,
			"key":       global.Config.Rustdesk.Key,
			"peers":     peers,
		},
	)
}

// SharedPeer 分享的peer
// @Tags WEBCLIENT
// @Summary 分享的peer
// @Description 分享的peer
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /shared-peer [post]
func (i *WebClient) SharedPeer(c *gin.Context) {
	j := &gin.H{}
	c.ShouldBindJSON(j)
	t := (*j)["share_token"].(string)
	if t == "" {
		response.Fail(c, 101, "share_token is required")
		return
	}
	sr := service.AllService.AddressBookService.SharedPeer(t)
	if sr == nil || sr.Id == 0 {
		response.Fail(c, 101, "share not found")
		return
	}
	if sr.Expire != 0 {
		//判断是否过期,created_at + expire > now
		ca := time.Time(sr.CreatedAt)
		if ca.Add(time.Second * time.Duration(sr.Expire)).Before(time.Now()) {
			response.Fail(c, 101, "share expired")
			return
		}
	}

	ab := service.AllService.AddressBookService.InfoByUserIdAndId(sr.UserId, sr.PeerId)
	if ab.RowId == 0 {
		response.Fail(c, 101, "peer not found")
		return
	}
	pp := &api.WebClientPeerPayload{}
	pp.FromShareRecord(sr)
	pp.Info.Username = ab.Username
	pp.Info.Hostname = ab.Hostname
	response.Success(c, gin.H{
		"id_server": global.Config.Rustdesk.IdServer,
		"key":       global.Config.Rustdesk.Key,
		"peer":      pp,
	})
}

// ServerConfigV2 服务配置
// @Tags WEBCLIENT_V2
// @Summary 服务配置
// @Description 服务配置,给webclient提供api-server
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /server-config-v2 [get]
// @Security token
func (i *WebClient) ServerConfigV2(c *gin.Context) {
	response.Success(
		c,
		gin.H{
			"id_server": global.Config.Rustdesk.IdServer,
			"key":       global.Config.Rustdesk.Key,
		},
	)
}
