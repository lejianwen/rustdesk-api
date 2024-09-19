package api

type OidcAuthRequest struct {
	DeviceInfo DeviceInfoInLogin `json:"deviceInfo" label:"设备信息"`
	Id         string            `json:"id"  label:"id"`
	Op         string            `json:"op" label:"op"`
	Uuid       string            `json:"uuid"  label:"uuid"`
}

type OidcAuthQuery struct {
	Code string `json:"code" form:"code" label:"code"`
	Id   string `json:"id" form:"id" label:"id"`
	Uuid string `json:"uuid" form:"uuid" label:"uuid"`
}
