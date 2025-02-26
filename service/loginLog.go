package service

import (
	"github.com/lejianwen/rustdesk-api/v2/model"
	"gorm.io/gorm"
)

type LoginLogService struct {
}

// InfoById 根据用户id取用户信息
func (us *LoginLogService) InfoById(id uint) *model.LoginLog {
	u := &model.LoginLog{}
	DB.Where("id = ?", id).First(u)
	return u
}

func (us *LoginLogService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.LoginLogList) {
	res = &model.LoginLogList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := DB.Model(&model.LoginLog{})
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
	res := DB.Create(u).Error
	return res
}
func (us *LoginLogService) Delete(u *model.LoginLog) error {
	return DB.Delete(u).Error
}

// Update 更新
func (us *LoginLogService) Update(u *model.LoginLog) error {
	return DB.Model(u).Updates(u).Error
}

func (us *LoginLogService) BatchDelete(ids []uint) error {
	return DB.Where("id in (?)", ids).Delete(&model.LoginLog{}).Error
}

func (us *LoginLogService) SoftDelete(l *model.LoginLog) error {
	l.IsDeleted = model.IsDeletedYes
	return us.Update(l)
}

func (us *LoginLogService) BatchSoftDelete(uid uint, ids []uint) error {
	return DB.Model(&model.LoginLog{}).Where("user_id = ? and id in (?)", uid, ids).Update("is_deleted", model.IsDeletedYes).Error
}
