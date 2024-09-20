package service

import (
	"Gwen/global"
	adResp "Gwen/http/response/admin"
	"Gwen/model"
	"Gwen/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"math/rand"
	"strconv"
	"time"
)

type UserService struct {
}

// InfoById 根据用户id取用户信息
func (us *UserService) InfoById(id uint) *model.User {
	u := &model.User{}
	global.DB.Where("id = ?", id).First(u)
	return u
}

// InfoByOpenid 根据openid取用户信息
func (us *UserService) InfoByOpenid(openid string) *model.User {
	u := &model.User{}
	global.DB.Where("openid = ?", openid).First(u)
	return u
}

// InfoByUsernamePassword 根据用户名密码取用户信息
func (us *UserService) InfoByUsernamePassword(username, password string) *model.User {
	u := &model.User{}
	global.DB.Where("username = ? and password = ?", username, us.EncryptPassword(password)).First(u)
	return u
}

// InfoByAccesstoken 根据accesstoken取用户信息
func (us *UserService) InfoByAccessToken(token string) *model.User {
	u := &model.User{}
	ut := &model.UserToken{}
	global.DB.Where("token = ?", token).First(ut)
	if ut.Id == 0 {
		return u
	}
	if ut.ExpiredAt < time.Now().Unix() {
		return u
	}
	global.DB.Where("id = ?", ut.UserId).First(u)
	return u
}

// GenerateToken 生成token
func (us *UserService) GenerateToken(u *model.User) string {
	return utils.Md5(u.Username + time.Now().String())
}

// Login 登录
func (us *UserService) Login(u *model.User, llog *model.LoginLog) *model.UserToken {
	token := us.GenerateToken(u)
	ut := &model.UserToken{
		UserId:    u.Id,
		Token:     token,
		ExpiredAt: time.Now().Add(time.Hour * 24 * 7).Unix(),
	}
	global.DB.Create(ut)
	global.DB.Create(llog)
	return ut
}

// CurUser 获取当前用户
func (us *UserService) CurUser(c *gin.Context) *model.User {
	user, _ := c.Get("curUser")
	u, ok := user.(*model.User)
	if !ok {
		return nil
	}
	return u
}

func (us *UserService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.UserList) {
	res = &model.UserList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.User{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.Users)
	return
}

// ListByGroupId 根据组id取用户列表
func (us *UserService) ListByGroupId(groupId, page, pageSize uint) (res *model.UserList) {
	res = us.List(page, pageSize, func(tx *gorm.DB) {
		tx.Where("group_id = ?", groupId)
	})
	return
}

// ListIdsByGroupId 根据组id取用户id列表
func (us *UserService) ListIdsByGroupId(groupId uint) (ids []uint) {
	global.DB.Model(&model.User{}).Where("group_id = ?", groupId).Pluck("id", &ids)
	return ids

}

// ListIdAndNameByGroupId 根据组id取用户id和用户名列表
func (us *UserService) ListIdAndNameByGroupId(groupId uint) (res []*model.User) {
	global.DB.Model(&model.User{}).Where("group_id = ?", groupId).Select("id, username").Find(&res)
	return res
}

// EncryptPassword 加密密码
func (us *UserService) EncryptPassword(password string) string {
	return utils.Md5(password + "rustdesk-api")
}

// CheckUserEnable 判断用户是否禁用
func (us *UserService) CheckUserEnable(u *model.User) bool {
	return u.Status == model.COMMON_STATUS_ENABLE
}

// Create 创建
func (us *UserService) Create(u *model.User) error {
	u.Password = us.EncryptPassword(u.Password)
	res := global.DB.Create(u).Error
	return res
}

// Logout 退出登录
func (us *UserService) Logout(u *model.User, token string) error {
	return global.DB.Where("user_id = ? and token = ?", u.Id, token).Delete(&model.UserToken{}).Error
}
func (us *UserService) Delete(u *model.User) error {
	return global.DB.Delete(u).Error
}

// Update 更新
func (us *UserService) Update(u *model.User) error {
	return global.DB.Model(u).Updates(u).Error
}

// FlushToken 清空token
func (us *UserService) FlushToken(u *model.User) error {
	return global.DB.Where("user_id = ?", u.Id).Delete(&model.UserToken{}).Error
}

// UpdatePassword 更新密码
func (us *UserService) UpdatePassword(u *model.User, password string) error {
	u.Password = us.EncryptPassword(password)
	err := global.DB.Model(u).Update("password", u.Password).Error
	if err != nil {
		return err
	}
	err = us.FlushToken(u)
	return err
}

// IsAdmin 是否管理员
func (us *UserService) IsAdmin(u *model.User) bool {
	return *u.IsAdmin
}

// RouteNames
func (us *UserService) RouteNames(u *model.User) []string {
	if us.IsAdmin(u) {
		return adResp.AdminRouteNames
	}
	return adResp.UserRouteNames
}

// InfoByGithubId 根据githubid取用户信息
func (us *UserService) InfoByGithubId(githubId string) *model.User {
	return us.InfoByOauthId(model.OauthTypeGithub, githubId)
}

// InfoByGoogleEmail 根据googleid取用户信息
func (us *UserService) InfoByGoogleEmail(email string) *model.User {
	return us.InfoByOauthId(model.OauthTypeGithub, email)
}

// InfoByOauthId 根据oauth取用户信息
func (us *UserService) InfoByOauthId(thirdType, uid string) *model.User {
	ut := AllService.OauthService.UserThirdInfo(thirdType, uid)
	if ut.Id == 0 {
		return nil
	}
	u := us.InfoById(ut.UserId)
	if u.Id == 0 {
		return nil
	}
	return u
}

// RegisterByGithub 注册
func (us *UserService) RegisterByGithub(githubName string, githubId string) *model.User {
	return us.RegisterByOauth(model.OauthTypeGithub, githubName, githubId)
}

// RegisterByGoogle 注册
func (us *UserService) RegisterByGoogle(name string, email string) *model.User {
	return us.RegisterByOauth(model.OauthTypeGoogle, name, email)
}

// RegisterByOauth 注册
func (us *UserService) RegisterByOauth(thirdType, thirdName, uid string) *model.User {
	tx := global.DB.Begin()
	ut := &model.UserThird{
		OpenId:    uid,
		ThirdName: thirdName,
		ThirdType: thirdType,
	}
	//global.DB.Where("open_id = ?", githubId).First(ut)
	//这种情况不应该出现，如果出现说明有bug
	//if ut.Id != 0 {
	//	u := &model.User{}
	//	global.DB.Where("id = ?", ut.UserId).First(u)
	//	tx.Commit()
	//	return u
	//}

	username := us.GenerateUsernameByOauth(thirdName)
	u := &model.User{
		Username: username,
		GroupId:  1,
	}
	global.DB.Create(u)

	ut.UserId = u.Id
	global.DB.Create(ut)

	tx.Commit()
	return u
}

// GenerateUsernameByOauth 生成用户名
func (us *UserService) GenerateUsernameByOauth(name string) string {
	u := &model.User{}
	global.DB.Where("username = ?", name).First(u)
	if u.Id == 0 {
		return name
	}
	name = name + strconv.FormatInt(rand.Int63n(10), 10)
	return us.GenerateUsernameByOauth(name)
}

// UserThirdsByUserId
func (us *UserService) UserThirdsByUserId(userId uint) (res []*model.UserThird) {
	global.DB.Where("user_id = ?", userId).Find(&res)
	return res
}

func (us *UserService) UserThirdInfo(userId uint, op string) *model.UserThird {
	ut := &model.UserThird{}
	global.DB.Where("user_id = ? and third_type = ?", userId, op).First(ut)
	return ut
}
