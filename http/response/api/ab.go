package api

import "Gwen/model"

type AbList struct {
	Peers     []*model.AddressBook `json:"peers,omitempty"`
	Tags      []string             `json:"tags,omitempty"`
	TagColors string               `json:"tag_colors,omitempty"`
}
