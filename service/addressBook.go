package service

import (
	"Gwen/global"
	"Gwen/model"
	"gorm.io/gorm"
)

type AddressBookService struct {
}

func (s *AddressBookService) Info(id uint) *model.AddressBook {
	p := &model.AddressBook{}
	global.DB.Where("id = ?", id).First(p)
	return p
}
func (s *AddressBookService) InfoByRowId(id uint) *model.AddressBook {
	p := &model.AddressBook{}
	global.DB.Where("row_id = ?", id).First(p)
	return p
}
func (s *AddressBookService) ListByUserId(userId, page, pageSize uint) (res *model.AddressBookList) {
	res = s.List(page, pageSize, func(tx *gorm.DB) {
		tx.Where("user_id = ?", userId)
	})
	return
}
func (s *AddressBookService) ListByUserIds(userIds []uint, page, pageSize uint) (res *model.AddressBookList) {
	res = s.List(page, pageSize, func(tx *gorm.DB) {
		tx.Where("user_id in (?)", userIds)
	})
	return
}

// AddAddressBook
func (s *AddressBookService) AddAddressBook(ab *model.AddressBook) error {
	return global.DB.Create(ab).Error
}

// UpdateAddressBook
func (s *AddressBookService) UpdateAddressBook(abs []*model.AddressBook, userId uint) error {
	//比较peers和数据库中的数据，如果peers中的数据在数据库中不存在，则添加，如果存在则更新，如果数据库中的数据在peers中不存在，则删除
	// 开始事务
	tx := global.DB.Begin()
	//1. 获取数据库中的数据
	var dbABs []*model.AddressBook
	tx.Where("user_id = ?", userId).Find(&dbABs)
	//2. 比较peers和数据库中的数据
	//2.1 获取peers中的id
	aBIds := make(map[string]*model.AddressBook)
	for _, ab := range abs {
		aBIds[ab.Id] = ab
	}
	//2.2 获取数据库中的id
	dbABIds := make(map[string]*model.AddressBook)
	for _, dbAb := range dbABs {
		dbABIds[dbAb.Id] = dbAb
	}
	//2.3 比较peers和数据库中的数据
	for id, ab := range aBIds {
		dbAB, ok := dbABIds[id]
		ab.UserId = userId
		if !ok {
			//添加
			tx.Create(ab)
		} else {
			//更新
			tx.Model(&model.AddressBook{}).Where("row_id = ?", dbAB.RowId).Updates(ab)
		}
	}
	//2.4 删除
	for id, dbAB := range dbABIds {
		_, ok := aBIds[id]
		if !ok {
			tx.Delete(dbAB)
		}
	}
	tx.Commit()
	return nil

}

func (t *AddressBookService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.AddressBookList) {
	res = &model.AddressBookList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.AddressBook{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.AddressBooks)
	return
}

// Create 创建
func (t *AddressBookService) Create(u *model.AddressBook) error {
	res := global.DB.Create(u).Error
	return res
}
func (t *AddressBookService) Delete(u *model.AddressBook) error {
	return global.DB.Delete(u).Error
}

// Update 更新
func (t *AddressBookService) Update(u *model.AddressBook) error {
	return global.DB.Model(u).Updates(u).Error
}
