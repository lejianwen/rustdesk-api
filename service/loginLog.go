package service

import (
	"Gwen/global"
	"Gwen/model"
	"gorm.io/gorm"
)

type LoginLogService struct {
}

// InfoById 根据用户id取用户信息
func (us *LoginLogService) InfoById(id uint) *model.LoginLog {
	u := &model.LoginLog{}
	global.DB.Where("id = ?", id).First(u)
	return u
}

func (us *LoginLogService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.LoginLogList) {
	res = &model.LoginLogList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.LoginLog{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.LoginLogs)
	return
}

// Create 创建
func (us *LoginLogService) Create(u *model.LoginLog) error {
	res := global.DB.Create(u).Error
	return res
}
func (us *LoginLogService) Delete(u *model.LoginLog) error {
	return global.DB.Delete(u).Error
}

// Update 更新
func (us *LoginLogService) Update(u *model.LoginLog) error {
	return global.DB.Model(u).Updates(u).Error
}

func (us *LoginLogService) BatchDelete(ids []uint) error {
	return global.DB.Where("id in (?)", ids).Delete(&model.LoginLog{}).Error
}
