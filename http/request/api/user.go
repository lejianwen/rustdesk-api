package api

/*
*

	message LoginRequest {
	  string username = 1;
	  bytes password = 2;
	  string my_id = 4;
	  string my_name = 5;
	  OptionMessage option = 6;
	  oneof union {
	    FileTransfer file_transfer = 7;
	    PortForward port_forward = 8;
	  }
	  bool video_ack_required = 9;
	  uint64 session_id = 10;
	  string version = 11;
	  OSLogin os_login = 12;
	  string my_platform = 13;
	  bytes hwid = 14;
	}
*/
type LoginForm struct {
	Username string `json:"username" validate:"required,gte=4,lte=10" label:"用户名"`
	Password string `json:"password,omitempty" validate:"gte=4,lte=20" label:"密码"`
}

type UserListQuery struct {
	Page       uint   `json:"page" form:"page" validate:"required" label:"页码"`
	PageSize   uint   `json:"page_size" form:"page_size" validate:"required" label:"每页数量"`
	Status     int    `json:"status" form:"status" label:"状态"`
	Accessible string `json:"accessible" form:"accessible"`
}

type PeerListQuery struct {
	Page       uint   `json:"page" form:"page" validate:"required" label:"页码"`
	PageSize   uint   `json:"page_size" form:"page_size" validate:"required" label:"每页数量"`
	Status     int    `json:"status" form:"status" label:"状态"`
	Accessible string `json:"accessible" form:"accessible"`
}
