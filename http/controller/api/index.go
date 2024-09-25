package api

import (
	"Gwen/http/response"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Index struct {
}

// Index 首页
// @Tags 首页
// @Summary 首页
// @Description 首页
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router / [get]
func (i *Index) Index(c *gin.Context) {
	response.Success(
		c,
		"Hello Gwen",
	)
}

// Heartbeat 心跳
// @Tags 首页
// @Summary 心跳
// @Description 心跳
// @Accept  json
// @Produce  json
// @Success 200 {object} nil
// @Failure 500 {object} response.Response
// @Router /heartbeat [post]
func (i *Index) Heartbeat(c *gin.Context) {
	//b := &gin.H{}
	//err := c.BindJSON(b)
	//body : &map[id:xxx modified_at:0 uuid:NGIxZTZjM2YtNmNkMy00YTMwLWFiNjQtMzQ0MTA0NGE5ZDgz ver:1.003e+06]
	//fmt.Println(b, err, c.Request.Header)
	//header : map[Accept:[*/*] Accept-Encoding:[gzip] Content-Length:[105] Content-Type:[application/json]]
	c.JSON(http.StatusOK, gin.H{})
}
