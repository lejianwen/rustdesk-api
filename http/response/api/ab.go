package api

import "github.com/lejianwen/rustdesk-api/v2/model"

type AbList struct {
	Peers     []*model.AddressBook `json:"peers,omitempty"`
	Tags      []string             `json:"tags,omitempty"`
	TagColors string               `json:"tag_colors,omitempty"`
}

type SharedProfilesPayload struct {
	Guid  string `json:"guid"`
	Name  string `json:"name"`
	Owner string `json:"owner"`
	Note  string `json:"note"`
	Rule  int    `json:"rule"`
}
