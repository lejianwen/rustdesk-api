package service

import (
	"Gwen/global"
	"Gwen/model"
	"fmt"
	"net"
	"time"
)

type ServerCmdService struct{}

// List
func (is *ServerCmdService) List(page, pageSize uint) (res *model.ServerCmdList) {
	res = &model.ServerCmdList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.ServerCmd{})
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.ServerCmds)
	return
}

// Info
func (is *ServerCmdService) Info(id uint) *model.ServerCmd {
	u := &model.ServerCmd{}
	global.DB.Where("id = ?", id).First(u)
	return u
}

// Delete
func (is *ServerCmdService) Delete(u *model.ServerCmd) error {
	return global.DB.Delete(u).Error
}

// Create
func (is *ServerCmdService) Create(u *model.ServerCmd) error {
	res := global.DB.Create(u).Error
	return res
}

// SendCmd 发送命令
func (is *ServerCmdService) SendCmd(cmd string, arg string) (string, error) {
	//组装命令
	cmd = cmd + " " + arg
	res, err := is.SendSocketCmd("v6", cmd)
	if err == nil {
		return res, nil
	}
	//v6连接失败，尝试v4
	res, err = is.SendSocketCmd("v4", cmd)
	if err == nil {
		return res, nil
	}
	return "", err
}

// SendSocketCmd
func (is *ServerCmdService) SendSocketCmd(ty string, cmd string) (string, error) {
	addr := "[::1]"
	tcp := "tcp6"
	if ty == "v4" {
		tcp = "tcp"
		addr = "127.0.0.1"
	}
	conn, err := net.Dial(tcp, addr+":21115")
	if err != nil {
		fmt.Printf("connect to id %s server failed: %v\n", ty, err)
		return "", err
	}
	defer conn.Close()
	//发送命令
	_, err = conn.Write([]byte(cmd))
	if err != nil {
		fmt.Printf("send cmd failed: %v\n", err)
		return "", err
	}
	time.Sleep(100 * time.Millisecond)
	//读取返回
	buf := make([]byte, 1024)
	n, err := conn.Read(buf)
	if err != nil && err.Error() != "EOF" {
		fmt.Printf("read response failed: %v\n", err)
		return "", err
	}
	return string(buf[:n]), nil
}

func (is *ServerCmdService) Update(f *model.ServerCmd) error {
	return global.DB.Model(f).Updates(f).Error
}
