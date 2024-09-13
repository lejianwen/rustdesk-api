package response

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
type PageData struct {
	Page  int         `json:"page"`
	Total int         `json:"total"`
	List  interface{} `json:"list"`
}

type DataResponse struct {
	Total uint        `json:"total"`
	Data  interface{} `json:"data"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func SendResponse(c *gin.Context, code int, message string, data interface{}) {
	c.JSON(http.StatusOK, Response{
		code, message, data,
	})
}

func Success(c *gin.Context, data interface{}) {
	SendResponse(c, 0, "success", data)
}

func Fail(c *gin.Context, code int, message string) {
	SendResponse(c, code, message, nil)
}

func Error(c *gin.Context, message string) {
	c.JSON(http.StatusBadRequest, ErrorResponse{
		Error: message,
	})
}

type ServerConfigResponse struct {
	IdServer    string `json:"id_server"`
	Key         string `json:"key"`
	RelayServer string `json:"relay_server"`
	ApiServer   string `json:"api_server"`
}
