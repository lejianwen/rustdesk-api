package api

import (
	apiReq "Gwen/http/request/api"
	"Gwen/http/response"
	apiResp "Gwen/http/response/api"
	"Gwen/model"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Group struct {
}

// Users 用户列表
// @Tags 群组
// @Summary 用户列表
// @Description 用户列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param pageSize query int false "每页数量"
// @Param status query int false "状态"
// @Param accessible query string false "accessible"
// @Success 200 {object} response.DataResponse{data=[]apiResp.UserPayload}
// @Failure 500 {object} response.ErrorResponse
// @Router /users [get]
// @Security BearerAuth
func (g *Group) Users(c *gin.Context) {
	u := service.AllService.UserService.CurUser(c)

	if !*u.IsAdmin {
		gr := service.AllService.GroupService.InfoById(u.GroupId)
		if gr.Type != model.GroupTypeShare {
			response.Error(c, response.TranslateMsg(c, "NoAccess"))
			return
		}
	}

	q := &apiReq.UserListQuery{}
	err := c.ShouldBindQuery(&q)
	if err != nil {
		response.Error(c, err.Error())
		return
	}
	userList := service.AllService.UserService.ListByGroupId(u.GroupId, q.Page, q.PageSize)
	var data []*apiResp.UserPayload
	for _, user := range userList.Users {
		up := &apiResp.UserPayload{}
		up.FromUser(user)
		data = append(data, up)
	}
	c.JSON(http.StatusOK, response.DataResponse{
		Total: uint(userList.Total),
		Data:  data,
	})
}

// Peers
// @Tags 群组
// @Summary 机器
// @Description 机器
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param pageSize query int false "每页数量"
// @Param status query int false "状态"
// @Param accessible query string false "accessible"
// @Success 200 {object} response.DataResponse
// @Failure 500 {object} response.Response
// @Router /peers [get]
// @Security BearerAuth
func (g *Group) Peers(c *gin.Context) {
	u := service.AllService.UserService.CurUser(c)

	if !*u.IsAdmin {
		gr := service.AllService.GroupService.InfoById(u.GroupId)
		if gr.Type != model.GroupTypeShare {
			response.Error(c, response.TranslateMsg(c, "NoAccess"))
			return
		}
	}

	q := &apiReq.PeerListQuery{}
	err := c.ShouldBindQuery(&q)
	if err != nil {
		response.Error(c, err.Error())
		return
	}

	users := service.AllService.UserService.ListIdAndNameByGroupId(u.GroupId)
	namesById := make(map[uint]string)
	userIds := make([]uint, 0)
	for _, user := range users {
		namesById[user.Id] = user.Username
		userIds = append(userIds, user.Id)
	}
	peerList := service.AllService.PeerService.ListByUserIds(userIds, q.Page, q.PageSize)
	var data []*apiResp.GroupPeerPayload
	for _, peer := range peerList.Peers {
		uname, ok := namesById[peer.UserId]
		if !ok {
			uname = ""
		}
		pp := &apiResp.GroupPeerPayload{}
		pp.FromPeer(peer, uname)
		data = append(data, pp)

	}
	c.JSON(http.StatusOK, response.DataResponse{
		Total: uint(peerList.Total),
		Data:  data,
	})
}
