package api

import (
	"Gwen/model"
	"time"
)

//	type T struct {
//		Field1 struct {
//			ViewStyle string `json:"view-style"`
//			Tm        int64  `json:"tm"`
//			Info      struct {
//				Username string `json:"username"`
//				Hostname string `json:"hostname"`
//				Platform string `json:"platform"`
//				Displays []struct {
//					X      int    `json:"x"`
//					Y      int    `json:"y"`
//					Width  int    `json:"width"`
//					Height int    `json:"height"`
//					Name   string `json:"name"`
//					Online bool   `json:"online"`
//				} `json:"displays"`
//				CurrentDisplay int    `json:"current_display"`
//				SasEnabled     bool   `json:"sas_enabled"`
//				Version        string `json:"version"`
//				ConnId         int    `json:"conn_id"`
//				Features       struct {
//					PrivacyMode bool `json:"privacy_mode"`
//				} `json:"features"`
//			} `json:"info"`
//		} `json:"1799928825"`
//	}

type WebClientPeerPayload struct {
	ViewStyle string                   `json:"view-style"`
	Tm        int64                    `json:"tm"`
	Info      WebClientPeerInfoPayload `json:"info"`
}

type WebClientPeerInfoPayload struct {
	Username string `json:"username"`
	Hostname string `json:"hostname"`
	Platform string `json:"platform"`
}

func (wcpp *WebClientPeerPayload) FromAddressBook(a *model.AddressBook) {
	wcpp.ViewStyle = "shrink"
	wcpp.Tm = time.Now().UnixNano()
	wcpp.Info = WebClientPeerInfoPayload{
		Username: a.Username,
		Hostname: a.Hostname,
		Platform: a.Platform,
	}
}
