package api

import (
	requstform "Gwen/http/request/api"
	"Gwen/http/response"
	"Gwen/http/response/api"
	"Gwen/model"
	"Gwen/service"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Ab struct {
}

// Ab
// @Tags 地址
// @Summary 地址列表
// @Description 地址列表
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.ErrorResponse
// @Router /ab [get]
// @Security BearerAuth
func (a *Ab) Ab(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)

	al := service.AllService.AddressBookService.ListByUserId(user.Id, 1, 1000)
	tags := service.AllService.TagService.ListByUserId(user.Id)

	tagColors := map[string]uint{}
	//将tags中的name转成一个以逗号分割的字符串
	var tagNames []string
	for _, tag := range tags.Tags {
		tagNames = append(tagNames, tag.Name)
		tagColors[tag.Name] = tag.Color
	}
	tgc, _ := json.Marshal(tagColors)
	res := &api.AbList{
		Peers:     al.AddressBooks,
		Tags:      tagNames,
		TagColors: string(tgc),
	}
	data, _ := json.Marshal(res)
	c.JSON(http.StatusOK, gin.H{
		"data": string(data),
		//"licensed_devices": 999,
	})
}

// UpAb
// @Tags 地址
// @Summary 地址更新
// @Description 地址更新
// @Accept  json
// @Produce  json
// @Param body body requstform.AddressBookForm true "地址表单"
// @Success 200 {string} string "null"
// @Failure 500 {object} response.ErrorResponse
// @Router /ab [post]
// @Security BearerAuth
func (a *Ab) UpAb(c *gin.Context) {
	abf := &requstform.AddressBookForm{}
	err := c.ShouldBindJSON(&abf)
	if err != nil {
		fmt.Println(err)
		response.Error(c, "参数错误")
		return
	}
	abd := &requstform.AddressBookFormData{}
	err = json.Unmarshal([]byte(abf.Data), abd)
	if err != nil {
		response.Error(c, "系统错误")
		return
	}

	//fmt.Println(abd)
	//for _, peer := range abd.Peers {
	//	fmt.Println(peer)
	//}

	user := service.AllService.UserService.CurUser(c)

	err = service.AllService.AddressBookService.UpdateAddressBook(abd.Peers, user.Id)
	if err != nil {
		c.Abort()
		return
	}

	tc := map[string]uint{}
	err = json.Unmarshal([]byte(abd.TagColors), &tc)
	if err != nil {
		fmt.Println(err)
		response.Error(c, "系统错误")
		return
	} else {
		service.AllService.TagService.UpdateTags(user.Id, tc)
	}

	c.JSON(http.StatusOK, nil)
}

// Tags
// @Tags 地址
// @Summary 标签
// @Description 标签
// @Accept  json
// @Produce  json
// @Success 200 {object} []model.Tag
// @Failure 500 {object} response.ErrorResponse
// @Router /tags [post]
// @Security BearerAuth
func (a *Ab) Tags(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)

	tags := service.AllService.TagService.ListByUserId(user.Id)
	c.JSON(http.StatusOK, tags.Tags)
}

// TagAdd
// @Tags 地址
// @Summary 标签添加
// @Description 标签
// @Accept  json
// @Produce  json
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/add [post]
// @Security BearerAuth
func (a *Ab) TagAdd(c *gin.Context) {
	t := &model.Tag{}
	err := c.ShouldBindJSON(t)
	if err != nil {
		fmt.Println(err)
		response.Error(c, "参数错误")
		return

	}
	//u := service.AllService.UserService.CurUser(c)

	//err = service.AllService.TagService.UpdateTags(t.Name, t.Color, user.Id)
	//if err != nil {
	//	response.Error(c, "操作失败")
	//	return
	//}
	c.JSON(http.StatusOK, "")
}
