package api

import "github.com/lejianwen/rustdesk-api/v2/model"

/*
GroupPeerPayload
https://github.com/rustdesk/rustdesk/blob/master/flutter/lib/common/hbbs/hbbs.dart#L64

		String id = '';
		Map<String, dynamic> info = {};
		int? status;
		String user = '';
		String user_name = '';
		String note = '';

	 PeerPayload.fromJson(Map<String, dynamic> json)
	      : id = json['id'] ?? '',
	        info = (json['info'] is Map<String, dynamic>) ? json['info'] : {},
	        status = json['status'],
	        user = json['user'] ?? '',
	        user_name = json['user_name'] ?? '',
	        note = json['note'] ?? '';

		static Peer toPeer(GroupPeerPayload p) {
		    return Peer.fromJson({
		      "id": p.id,
		      'loginName': p.user_name,
		      "username": p.info['username'] ?? '',
		      "platform": _platform(p.info['os']),
		      "hostname": p.info['device_name'],
		    });
		  }
*/
type GroupPeerPayload struct {
	Id              string           `json:"id"`
	Info            *PeerPayloadInfo `json:"info"`
	Status          int              `json:"status"`
	User            string           `json:"user"`
	UserName        string           `json:"user_name"`
	Note            string           `json:"note"`
	DeviceGroupName string           `json:"device_group_name"`
}
type PeerPayloadInfo struct {
	DeviceName string `json:"device_name"`
	Os         string `json:"os"`
	Username   string `json:"username"`
}

func (gpp *GroupPeerPayload) FromAddressBook(a *model.AddressBook, username string) {
	gpp.Id = a.Id
	os := a.Platform
	if a.Platform == "Mac OS" {
		os = "MacOS"
	}
	gpp.Info = &PeerPayloadInfo{
		DeviceName: a.Hostname,
		Os:         os,
		Username:   a.Username,
	}
	gpp.UserName = username
}

func (gpp *GroupPeerPayload) FromPeer(p *model.Peer, username string, dGroupName string) {
	gpp.Id = p.Id
	gpp.Info = &PeerPayloadInfo{
		DeviceName: p.Hostname,
		Os:         p.Os,
		Username:   p.Username,
	}
	gpp.Note = ""
	gpp.UserName = username
	gpp.DeviceGroupName = dGroupName
}
