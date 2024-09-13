package admin

import "Gwen/model"

type GroupForm struct {
	Id   uint   `json:"id"`
	Name string `json:"name" validate:"required"`
}

func (gf *GroupForm) FromGroup(group *model.Group) *GroupForm {
	gf.Id = group.Id
	gf.Name = group.Name
	return gf
}

func (gf *GroupForm) ToGroup() *model.Group {
	group := &model.Group{}
	group.Id = gf.Id
	group.Name = gf.Name
	return group
}
