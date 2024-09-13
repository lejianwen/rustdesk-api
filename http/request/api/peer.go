package api

import "Gwen/model"

type AddressBookFormData struct {
	Tags      []string             `json:"tags"`
	Peers     []*model.AddressBook `json:"peers"`
	TagColors string               `json:"tag_colors"`
}

type AddressBookForm struct {
	Data string `json:"data" example:"{\"tags\":[\"tag1\",\"tag2\",\"tag3\"],\"peers\":[{\"id\":\"abc\",\"username\":\"abv-l\",\"hostname\":\"\",\"platform\":\"Windows\",\"alias\":\"\",\"tags\":[\"tag1\",\"tag2\"],\"hash\":\"hash\"}],\"tag_colors\":\"{\\\"tag1\\\":4288585374,\\\"tag2\\\":4278238420,\\\"tag3\\\":4291681337}\"}"`
}

type PeerForm struct {
	Cpu      string `json:"cpu"`
	Hostname string `json:"hostname"`
	Id       string `json:"id"`
	Memory   string `json:"memory"`
	Os       string `json:"os"`
	Username string `json:"username"`
	Uuid     string `json:"uuid"`
	Version  string `json:"version"`
}

func (pf *PeerForm) ToPeer() *model.Peer {
	return &model.Peer{
		Cpu:      pf.Cpu,
		Hostname: pf.Hostname,
		Id:       pf.Id,
		Memory:   pf.Memory,
		Os:       pf.Os,
		Username: pf.Username,
		Uuid:     pf.Uuid,
		Version:  pf.Version,
	}
}
