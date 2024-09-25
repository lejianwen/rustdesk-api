package api

import (
	"Gwen/global"
	requstform "Gwen/http/request/api"
	"Gwen/http/response"
	"Gwen/http/response/api"
	"Gwen/model"
	"Gwen/service"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	abd := &requstform.AddressBookFormData{}
	err = json.Unmarshal([]byte(abf.Data), abd)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	tc := map[string]uint{}
	err = json.Unmarshal([]byte(abd.TagColors), &tc)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	user := service.AllService.UserService.CurUser(c)

	err = service.AllService.AddressBookService.UpdateAddressBook(abd.Peers, user.Id)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}

	service.AllService.TagService.UpdateTags(user.Id, tc)

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
// @Tags 地址[Personal]
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
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	tag := service.AllService.TagService.InfoByUserIdAndName(u.Id, t.Name)
	if tag != nil && tag.Id != 0 {
		response.Error(c, response.TranslateMsg(c, "ItemExists"))
		return
	}
	t.UserId = u.Id
	err = service.AllService.TagService.Create(t)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	c.String(http.StatusOK, "")
}

// TagRename
// @Tags 地址[Personal]
// @Summary 标签重命名
// @Description 标签
// @Accept  json
// @Produce  json
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/tag/rename/{guid} [put]
// @Security BearerAuth
func (a *Ab) TagRename(c *gin.Context) {
	t := &requstform.TagRenameForm{}
	err := c.ShouldBindJSON(t)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	tag := service.AllService.TagService.InfoByUserIdAndName(u.Id, t.Old)
	if tag == nil || tag.Id == 0 {
		response.Error(c, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	ntag := service.AllService.TagService.InfoByUserIdAndName(u.Id, t.New)
	if ntag != nil && ntag.Id != 0 {
		response.Error(c, response.TranslateMsg(c, "ItemExists"))
		return
	}
	tag.Name = t.New
	err = service.AllService.TagService.Update(tag)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	c.String(http.StatusOK, "")
}

// TagUpdate
// @Tags 地址[Personal]
// @Summary 标签修改颜色
// @Description 标签
// @Accept  json
// @Produce  json
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/tag/update/{guid} [put]
// @Security BearerAuth
func (a *Ab) TagUpdate(c *gin.Context) {
	t := &requstform.TagColorForm{}
	err := c.ShouldBindJSON(t)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	tag := service.AllService.TagService.InfoByUserIdAndName(u.Id, t.Name)
	if tag == nil || tag.Id == 0 {
		response.Error(c, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	tag.Color = t.Color
	err = service.AllService.TagService.Update(tag)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	c.String(http.StatusOK, "")
}

// TagDel
// @Tags 地址[Personal]
// @Summary 标签删除
// @Description 标签
// @Accept  json
// @Produce  json
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/tag/{guid} [delete]
// @Security BearerAuth
func (a *Ab) TagDel(c *gin.Context) {
	t := &[]string{}
	err := c.ShouldBind(t)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	//fmt.Println(t)
	u := service.AllService.UserService.CurUser(c)
	for _, name := range *t {
		tag := service.AllService.TagService.InfoByUserIdAndName(u.Id, name)
		if tag == nil || tag.Id == 0 {
			response.Error(c, response.TranslateMsg(c, "ItemNotFound"))
			return
		}
		err = service.AllService.TagService.Delete(tag)
		if err != nil {
			response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
			return
		}
	}
	c.String(http.StatusOK, "")
}

// Personal
// @Tags 地址[Personal]
// @Summary 个人地址
// @Description 个人地址
// @Accept  json
// @Produce  json
// @Param string body string false  "string valid"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /ab/personal [post]
// @Security BearerAuth
func (a *Ab) Personal(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)
	/**
	guid = json['guid'] ?? '',
	       name = json['name'] ?? '',
	       owner = json['owner'] ?? '',
	       note = json['note'] ?? '',
	       rule = json['rule'] ?? 0;
	*/
	if global.Config.Rustdesk.Personal == 1 {
		guid := strconv.Itoa(int(user.GroupId)) + "-" + strconv.Itoa(int(user.Id))
		//如果返回了guid，后面的请求会有变化
		c.JSON(http.StatusOK, gin.H{
			"guid": guid,
			"name": user.Username,
			"rule": 0,
		})
	} else {
		c.JSON(http.StatusOK, nil)
	}

}

// Settings
// @Tags 地址[Personal]
// @Summary 设置
// @Description 设置
// @Accept  json
// @Produce  json
// @Param string body string false  "string valid"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /ab/settings [post]
// @Security BearerAuth
func (a *Ab) Settings(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"max_peer_one_ab": 0, //最大peer数，0表示不限制
	})
}

// SharedProfiles
// @Tags 地址[Personal]
// @Summary 共享地址簿
// @Description 共享
// @Accept  json
// @Produce  json
// @Param string body string false  "string valid"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /ab/shared/profiles [post]
// @Security BearerAuth
func (a *Ab) SharedProfiles(c *gin.Context) {
	//AbProfile.fromJson(Map<String, dynamic> json)
	//: guid = json['guid'] ?? '',
	//	name = json['name'] ?? '',
	//	owner = json['owner'] ?? '',
	//	note = json['note'] ?? '',
	//	rule = json['rule'] ?? 0;
	//暂时没必要返回数据，可能是为了共享地址簿
	/*item := map[string]interface{}{
		"guid":  "1",
		"name":  "admin",
		"owner": "admin",
		"note":  "admin11",
		"rule":  0,
	}
	item2 := map[string]interface{}{
		"guid":  "2",
		"name":  "admin2",
		"owner": "admin2",
		"note":  "admin22",
		"rule":  0,
	}
	c.JSON(http.StatusOK, gin.H{
		"total": 2,
		"data":  []interface{}{item, item2},
	})*/

	c.JSON(http.StatusOK, gin.H{
		"total": 0,
		"data":  nil,
	})
}

// Peers
// @Tags 地址[Personal]
// @Summary 地址列表
// @Description 地址
// @Accept  json
// @Produce  json
// @Param string body string false  "string valid"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /ab/peers [post]
// @Security BearerAuth
func (a *Ab) Peers(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)
	al := service.AllService.AddressBookService.ListByUserId(user.Id, 1, 1000)
	c.JSON(http.StatusOK, gin.H{
		"total":            al.Total,
		"data":             al.AddressBooks,
		"licensed_devices": 99999,
	})
}

// PTags
// @Tags 地址[Personal]
// @Summary 标签
// @Description 标签
// @Accept  json
// @Produce  json
// @Param id path string true "id"
// @Success 200 {object} model.TagList
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/tags/{guid} [post]
// @Security BearerAuth
func (a *Ab) PTags(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)

	tags := service.AllService.TagService.ListByUserId(user.Id)
	c.JSON(http.StatusOK, tags.Tags)
}

// PeerAdd
// @Tags 地址[Personal]
// @Summary 添加地址
// @Description 添加地址
// @Accept  json
// @Produce  json
// @Param id path string true "id"
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/peer/add/{guid} [post]
// @Security BearerAuth
func (a *Ab) PeerAdd(c *gin.Context) {
	// forceAlwaysRelay永远是字符串"false"，真是坑
	//f := &gin.H{}
	f := &requstform.PersonalAddressBookForm{}
	err := c.ShouldBindJSON(f)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	fmt.Println(f)
	u := service.AllService.UserService.CurUser(c)
	f.UserId = u.Id
	ab := f.ToAddressBook()
	err = service.AllService.AddressBookService.AddAddressBook(ab)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	c.String(http.StatusOK, "")
}

// PeerDel
// @Tags 地址[Personal]
// @Summary 删除地址
// @Description 删除地址
// @Accept  json
// @Produce  json
// @Param id path string true "id"
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/peer/add/{guid} [delete]
// @Security BearerAuth
func (a *Ab) PeerDel(c *gin.Context) {
	f := &[]string{}
	err := c.ShouldBind(f)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	u := service.AllService.UserService.CurUser(c)
	for _, id := range *f {
		ab := service.AllService.AddressBookService.InfoByUserIdAndId(u.Id, id)
		if ab == nil || ab.RowId == 0 {
			response.Error(c, response.TranslateMsg(c, "ItemNotFound"))
			return
		}
		err = service.AllService.AddressBookService.Delete(ab)
		if err != nil {
			response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
			return
		}
	}

	c.String(http.StatusOK, "")
}

// PeerUpdate
// @Tags 地址[Personal]
// @Summary 更新地址
// @Description 更新地址
// @Accept  json
// @Produce  json
// @Param id path string true "id"
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /ab/peer/update/{guid} [put]
// @Security BearerAuth
func (a *Ab) PeerUpdate(c *gin.Context) {
	//f := &gin.H{}
	f := &requstform.PersonalAddressBookForm{}
	err := c.ShouldBindJSON(f)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	//fmt.Println(f)
	//return
	u := service.AllService.UserService.CurUser(c)
	ab := service.AllService.AddressBookService.InfoByUserIdAndId(u.Id, f.Id)
	if ab == nil || ab.RowId == 0 {
		response.Error(c, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	nab := f.ToAddressBook()
	nab.RowId = ab.RowId
	err = service.AllService.AddressBookService.Update(nab)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	c.String(http.StatusOK, "")
}
