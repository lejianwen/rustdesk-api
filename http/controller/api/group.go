package api

import (
	"github.com/gin-gonic/gin"
	apiReq "github.com/lejianwen/rustdesk-api/v2/http/request/api"
	"github.com/lejianwen/rustdesk-api/v2/http/response"
	apiResp "github.com/lejianwen/rustdesk-api/v2/http/response/api"
	"github.com/lejianwen/rustdesk-api/v2/model"
	"github.com/lejianwen/rustdesk-api/v2/service"
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
	q := &apiReq.UserListQuery{}
	err := c.ShouldBindQuery(&q)
	if err != nil {
		response.Error(c, err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	gr := service.AllService.GroupService.InfoById(u.GroupId)
	userList := &model.UserList{}
	if !*u.IsAdmin && gr.Type != model.GroupTypeShare {
		//仅能获取到自己
		userList.Users = append(userList.Users, u)
		userList.Total = 1
	} else {
		userList = service.AllService.UserService.ListByGroupId(u.GroupId, q.Page, q.PageSize)
	}

	data := make([]*apiResp.UserPayload, 0, len(userList.Users))
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
	q := &apiReq.PeerListQuery{}
	err := c.ShouldBindQuery(&q)
	if err != nil {
		response.Error(c, err.Error())
		return
	}
	gr := service.AllService.GroupService.InfoById(u.GroupId)
	users := make([]*model.User, 0, 1)
	if !*u.IsAdmin && gr.Type != model.GroupTypeShare {
		//仅能获取到自己
		users = append(users, u)
	} else {
		users = service.AllService.UserService.ListIdAndNameByGroupId(u.GroupId)
	}

	namesById := make(map[uint]string, len(users))
	userIds := make([]uint, 0, len(users))
	for _, user := range users {
		namesById[user.Id] = user.Username
		userIds = append(userIds, user.Id)
	}
	peerList := service.AllService.PeerService.ListByUserIds(userIds, q.Page, q.PageSize)
	data := make([]*apiResp.GroupPeerPayload, 0, len(peerList.Peers))
	for _, peer := range peerList.Peers {
		uname, ok := namesById[peer.UserId]
		if !ok {
			uname = ""
		}
		pp := &apiResp.GroupPeerPayload{}
		pp.FromPeer(peer, uname)
		//pp.DeviceGroupName = uname
		data = append(data, pp)

	}
	c.JSON(http.StatusOK, response.DataResponse{
		Total: uint(peerList.Total),
		Data:  data,
	})
}

// Device
// @Tags 群组
// @Summary 设备
// @Description 机器
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param pageSize query int false "每页数量"
// @Param status query int false "状态"
// @Param accessible query string false "accessible"
// @Success 200 {object} response.DataResponse
// @Failure 500 {object} response.Response
// @Router /device-group/accessible [get]
// @Security BearerAuth
func (g *Group) Device(c *gin.Context) {
	c.JSON(http.StatusOK, response.DataResponse{
		Total: 0,
		Data:  nil,
	})
}
