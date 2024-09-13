package service

import (
	"Gwen/global"
	"Gwen/model"
	"gorm.io/gorm"
)

type TagService struct {
}

func (s *TagService) Info(id uint) *model.Tag {
	p := &model.Tag{}
	global.DB.Where("id = ?", id).First(p)
	return p
}

func (s *TagService) ListByUserId(userId uint) (res *model.TagList) {
	res = s.List(1, 1000, func(tx *gorm.DB) {
		tx.Where("user_id = ?", userId)
	})
	return
}

func (s *TagService) UpdateTags(userId uint, tags map[string]uint) {
	tx := global.DB.Begin()
	//先查询所有tag
	var allTags []*model.Tag
	tx.Where("user_id = ?", userId).Find(&allTags)
	for _, t := range allTags {
		if _, ok := tags[t.Name]; !ok {
			//删除
			tx.Delete(t)
		} else {
			if tags[t.Name] != t.Color {
				//更新
				t.Color = tags[t.Name]
				tx.Save(t)
			}
			//移除
			delete(tags, t.Name)
		}
	}
	//新增
	for tag, color := range tags {
		t := &model.Tag{}
		t.Name = tag
		t.Color = color
		t.UserId = userId
		tx.Create(t)
	}
	tx.Commit()
}

// InfoById 根据用户id取用户信息
func (t *TagService) InfoById(id uint) *model.Tag {
	u := &model.Tag{}
	global.DB.Where("id = ?", id).First(u)
	return u
}

func (t *TagService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.TagList) {
	res = &model.TagList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.Tag{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.Tags)
	return
}

// Create 创建
func (t *TagService) Create(u *model.Tag) error {
	res := global.DB.Create(u).Error
	return res
}
func (t *TagService) Delete(u *model.Tag) error {
	return global.DB.Delete(u).Error
}

// Update 更新
func (t *TagService) Update(u *model.Tag) error {
	return global.DB.Model(u).Updates(u).Error
}
