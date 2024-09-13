//go:build !windows

package http

import (
	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"
)

func Run(g *gin.Engine, addr string) {
	endless.ListenAndServe(addr, g)
}
