package admin

import (
	"encoding/json"
	_ "encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/lejianwen/rustdesk-api/global"
	"github.com/lejianwen/rustdesk-api/http/request/admin"
	"github.com/lejianwen/rustdesk-api/http/response"
	"github.com/lejianwen/rustdesk-api/service"
	"gorm.io/gorm"
	"strconv"
)

type AddressBook struct {
}

// Detail 地址簿
// @Tags 地址簿
// @Summary 地址簿详情
// @Description 地址簿详情
// @Accept  json
// @Produce  json
// @Param id path int true "ID"
// @Success 200 {object} response.Response{data=model.AddressBook}
// @Failure 500 {object} response.Response
// @Router /admin/address_book/detail/{id} [get]
// @Security token
func (ct *AddressBook) Detail(c *gin.Context) {
	id := c.Param("id")
	iid, _ := strconv.Atoi(id)
	t := service.AllService.AddressBookService.InfoByRowId(uint(iid))
	if t.RowId > 0 {
		response.Success(c, t)
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
	return
}

// Create 创建地址簿
// @Tags 地址簿
// @Summary 创建地址簿
// @Description 创建地址簿
// @Accept  json
// @Produce  json
// @Param body body admin.AddressBookForm true "地址簿信息"
// @Success 200 {object} response.Response{data=model.AddressBook}
// @Failure 500 {object} response.Response
// @Router /admin/address_book/create [post]
// @Security token
func (ct *AddressBook) Create(c *gin.Context) {
	f := &admin.AddressBookForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	t := f.ToAddressBook()
	if t.UserId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	if t.CollectionId > 0 && !service.AllService.AddressBookService.CheckCollectionOwner(t.UserId, t.CollectionId) {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}

	ex := service.AllService.AddressBookService.InfoByUserIdAndIdAndCid(t.UserId, t.Id, t.CollectionId)
	if ex.RowId > 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemExists"))
		return
	}

	err := service.AllService.AddressBookService.Create(t)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, nil)
}

// BatchCreate 批量创建地址簿
// @Tags 地址簿
// @Summary 批量创建地址簿
// @Description 批量创建地址簿
// @Accept  json
// @Produce  json
// @Param body body admin.AddressBookForm true "地址簿信息"
// @Success 200 {object} response.Response{data=model.AddressBook}
// @Failure 500 {object} response.Response
// @Router /admin/address_book/batchCreate [post]
// @Security token
func (ct *AddressBook) BatchCreate(c *gin.Context) {
	f := &admin.AddressBookForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	ul := len(f.UserIds)

	if ul == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	if ul > 1 {
		//多用户置空标签
		f.Tags = []string{}
		//多用户只能创建到默认地址簿
		f.CollectionId = 0
	}

	//创建标签
	/*for _, fu := range f.UserIds {
		if fu == 0 {
			continue
		}
		for _, ft := range f.Tags {
			exTag := service.AllService.TagService.InfoByUserIdAndNameAndCollectionId(fu, ft, 0)
			if exTag.Id == 0 {
				service.AllService.TagService.Create(&model.Tag{
					UserId: fu,
					Name:   ft,
				})
			}
		}
	}*/
	ts := f.ToAddressBooks()
	for _, t := range ts {
		if t.UserId == 0 {
			continue
		}
		ex := service.AllService.AddressBookService.InfoByUserIdAndIdAndCid(t.UserId, t.Id, t.CollectionId)
		if ex.RowId == 0 {
			service.AllService.AddressBookService.Create(t)
		}
	}

	response.Success(c, nil)
}

// List 列表
// @Tags 地址簿
// @Summary 地址簿列表
// @Description 地址簿列表
// @Accept  json
// @Produce  json
// @Param page query int false "页码"
// @Param page_size query int false "页大小"
// @Param user_id query int false "用户id"
// @Param is_my query int false "是否是我的"
// @Success 200 {object} response.Response{data=model.AddressBookList}
// @Failure 500 {object} response.Response
// @Router /admin/address_book/list [get]
// @Security token
func (ct *AddressBook) List(c *gin.Context) {
	query := &admin.AddressBookQuery{}
	if err := c.ShouldBindQuery(query); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	res := service.AllService.AddressBookService.List(query.Page, query.PageSize, func(tx *gorm.DB) {
		tx.Preload("Collection", func(txc *gorm.DB) *gorm.DB {
			return txc.Select("id,name")
		})
		if query.Id != "" {
			tx.Where("id like ?", "%"+query.Id+"%")
		}
		if query.UserId > 0 {
			tx.Where("user_id = ?", query.UserId)
		}
		if query.Username != "" {
			tx.Where("username like ?", "%"+query.Username+"%")
		}
		if query.Hostname != "" {
			tx.Where("hostname like ?", "%"+query.Hostname+"%")
		}
		if query.CollectionId != nil && *query.CollectionId >= 0 {
			tx.Where("collection_id = ?", query.CollectionId)
		}
	})

	abCIds := make([]uint, 0)
	for _, ab := range res.AddressBooks {
		abCIds = append(abCIds, ab.CollectionId)
	}
	response.Success(c, res)
}

// Update 编辑
// @Tags 地址簿
// @Summary 地址簿编辑
// @Description 地址簿编辑
// @Accept  json
// @Produce  json
// @Param body body admin.AddressBookForm true "地址簿信息"
// @Success 200 {object} response.Response{data=model.AddressBook}
// @Failure 500 {object} response.Response
// @Router /admin/address_book/update [post]
// @Security token
func (ct *AddressBook) Update(c *gin.Context) {
	f := &admin.AddressBookForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}
	if f.RowId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	ex := service.AllService.AddressBookService.InfoByRowId(f.RowId)
	if ex.RowId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	t := f.ToAddressBook()
	if t.CollectionId > 0 && !service.AllService.AddressBookService.CheckCollectionOwner(t.UserId, t.CollectionId) {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}
	err := service.AllService.AddressBookService.UpdateAll(t)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, nil)
}

// Delete 删除
// @Tags 地址簿
// @Summary 地址簿删除
// @Description 地址簿删除
// @Accept  json
// @Produce  json
// @Param body body admin.AddressBookForm true "地址簿信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/address_book/delete [post]
// @Security token
func (ct *AddressBook) Delete(c *gin.Context) {
	f := &admin.AddressBookForm{}
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
	t := service.AllService.AddressBookService.InfoByRowId(f.RowId)
	if t.RowId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	err := service.AllService.AddressBookService.Delete(t)
	if err == nil {
		response.Success(c, nil)
		return
	}
	response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
}

// ShareByWebClient
// @Tags 地址簿
// @Summary 地址簿分享
// @Description 地址簿分享
// @Accept  json
// @Produce  json
// @Param body body admin.ShareByWebClientForm true "地址簿信息"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/address_book/share [post]
// @Security token
func (ct *AddressBook) ShareByWebClient(c *gin.Context) {
	f := &admin.ShareByWebClientForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		response.Fail(c, 101, errList[0])
		return
	}

	u := service.AllService.UserService.CurUser(c)
	ab := service.AllService.AddressBookService.InfoByUserIdAndId(u.Id, f.Id)
	if ab.RowId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}
	m := f.ToShareRecord()
	m.UserId = u.Id
	err := service.AllService.AddressBookService.ShareByWebClient(m)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "OperationFailed")+err.Error())
		return
	}
	response.Success(c, &gin.H{
		"share_token": m.ShareToken,
	})
}

func (ct *AddressBook) BatchCreateFromPeers(c *gin.Context) {
	f := &admin.BatchCreateFromPeersForm{}
	if err := c.ShouldBindJSON(f); err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}

	if f.UserId == 0 {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError"))
		return
	}

	if f.CollectionId != 0 {
		collection := service.AllService.AddressBookService.CollectionInfoById(f.CollectionId)
		if collection.Id == 0 {
			response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
			return
		}
	}

	pl := int64(len(f.PeerIds))
	peers := service.AllService.PeerService.List(1, uint(pl), func(tx *gorm.DB) {
		tx.Where("row_id in ?", f.PeerIds)
	})
	if peers.Total == 0 || pl != peers.Total {
		response.Fail(c, 101, response.TranslateMsg(c, "ItemNotFound"))
		return
	}

	tags, _ := json.Marshal(f.Tags)
	for _, peer := range peers.Peers {
		ab := service.AllService.AddressBookService.FromPeer(peer)
		ab.Tags = tags
		ab.CollectionId = f.CollectionId
		ab.UserId = f.UserId
		ex := service.AllService.AddressBookService.InfoByUserIdAndIdAndCid(f.UserId, ab.Id, ab.CollectionId)
		if ex.RowId != 0 {
			continue
		}
		service.AllService.AddressBookService.Create(ab)
	}
	response.Success(c, nil)
}
