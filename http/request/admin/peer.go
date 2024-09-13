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
