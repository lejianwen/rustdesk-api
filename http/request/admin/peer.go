package admin

import "Gwen/model"

type PeerForm struct {
	RowId    uint   `json:"row_id" `
	Id       string `json:"id"`
	Cpu      string `json:"cpu"`
	Hostname string `json:"hostname"`
	Memory   string `json:"memory"`
	Os       string `json:"os"`
	Username string `json:"username"`
	Uuid     string `json:"uuid"`
	Version  string `json:"version"`
}

type PeerBatchDeleteForm struct {
	RowIds []uint `json:"row_ids" validate:"required"`
}

// ToPeer
func (f *PeerForm) ToPeer() *model.Peer {
	return &model.Peer{
		RowId:    f.RowId,
		Id:       f.Id,
		Cpu:      f.Cpu,
		Hostname: f.Hostname,
		Memory:   f.Memory,
		Os:       f.Os,
		Username: f.Username,
		Uuid:     f.Uuid,
		Version:  f.Version,
	}
}

type PeerQuery struct {
	PageQuery
	TimeAgo int `json:"time_ago" form:"time_ago"`
}
