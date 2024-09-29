package service

import (
	"Gwen/global"
	"Gwen/model"
	"gorm.io/gorm"
)

type PeerService struct {
}

// FindById 根据id查找
func (ps *PeerService) FindById(id string) *model.Peer {
	p := &model.Peer{}
	global.DB.Where("id = ?", id).First(p)
	return p
}
func (ps *PeerService) FindByUuid(uuid string) *model.Peer {
	p := &model.Peer{}
	global.DB.Where("uuid = ?", uuid).First(p)
	return p
}
func (ps *PeerService) InfoByRowId(id uint) *model.Peer {
	p := &model.Peer{}
	global.DB.Where("row_id = ?", id).First(p)
	return p
}

// UuidBindUserId 绑定用户id
func (ps *PeerService) UuidBindUserId(uuid string, userId uint) {
	peer := ps.FindByUuid(uuid)
	if peer.RowId > 0 {
		peer.UserId = userId
		ps.Update(peer)
	}
}

// ListByUserIds 根据用户id取列表
func (ps *PeerService) ListByUserIds(userIds []uint, page, pageSize uint) (res *model.PeerList) {
	res = &model.PeerList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.Peer{})
	tx.Where("user_id in (?)", userIds)
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.Peers)
	return
}

func (ps *PeerService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.PeerList) {
	res = &model.PeerList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.Peer{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.Peers)
	return
}

// Create 创建
func (ps *PeerService) Create(u *model.Peer) error {
	res := global.DB.Create(u).Error
	return res
}
func (ps *PeerService) Delete(u *model.Peer) error {
	return global.DB.Delete(u).Error
}

// BatchDelete
func (ps *PeerService) BatchDelete(ids []uint) error {
	return global.DB.Where("row_id in (?)", ids).Delete(&model.Peer{}).Error
}

// Update 更新
func (ps *PeerService) Update(u *model.Peer) error {
	return global.DB.Model(u).Updates(u).Error
}
