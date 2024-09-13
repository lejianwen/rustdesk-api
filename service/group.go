package service

import (
	"Gwen/global"
	"Gwen/model"
	"gorm.io/gorm"
)

type GroupService struct {
}

// InfoById 根据用户id取用户信息
func (us *GroupService) InfoById(id uint) *model.Group {
	u := &model.Group{}
	global.DB.Where("id = ?", id).First(u)
	return u
}

func (us *GroupService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.GroupList) {
	res = &model.GroupList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.Group{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.Groups)
	return
}

// Create 创建
func (us *GroupService) Create(u *model.Group) error {
	res := global.DB.Create(u).Error
	return res
}
func (us *GroupService) Delete(u *model.Group) error {
	return global.DB.Delete(u).Error
}

// Update 更新
func (us *GroupService) Update(u *model.Group) error {
	return global.DB.Model(u).Updates(u).Error
}
