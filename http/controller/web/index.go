package web

import (
	"Gwen/global"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Index struct {
}

func (i *Index) Index(c *gin.Context) {
	c.Redirect(302, "/_admin/")
}

func (i *Index) ConfigJs(c *gin.Context) {
	apiServer := global.Config.Rustdesk.ApiServer
	magicQueryonline := strconv.Itoa(global.Config.Rustdesk.WebclientMagicQueryonline)
	tmp := `
localStorage.setItem('api-server', "` + apiServer + `")
const ws2_prefix = 'wc-'
localStorage.setItem(ws2_prefix+'api-server', "` + apiServer + `")

window.webclient_magic_queryonline = ` + magicQueryonline + ``

	c.String(200, tmp)
}
