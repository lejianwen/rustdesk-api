package web

import (
	"Gwen/global"
	"github.com/gin-gonic/gin"
)

type Index struct {
}

func (i *Index) ConfigJs(c *gin.Context) {
	apiServer := global.Config.Rustdesk.ApiServer

	tmp := `
 	  window._gwen = {}
      window._gwen.kv = {}
      function getQueryVariable() {
          const query = window.location.hash.substring(3);
          const vars = query.split("&");
          for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split("=");
              window._gwen.kv[pair[0]] = pair[1]
          }
      }
      getQueryVariable()
      const id = window._gwen.kv.id || ''
      if (id) {
        localStorage.setItem('remote-id', id)
      }
      window._gwen.hosts = [
        "rs-sg.rustdesk.com",
        "rs-cn.rustdesk.com",
        "rs-us.rustdesk.com",
      ]
localStorage.setItem('api-server', "` + apiServer + `")
const autoWriteServer = () => {
          return setTimeout(() => {
              const token = localStorage.getItem('access_token')
              const apiserver = localStorage.getItem('api-server')
              if (token && apiserver) {
                  fetch(apiserver + "/api/server-config", {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + token
                          }
                      }
                  ).then(res => res.json()).then(res => {
                      if (res.code === 0) {
						  if(!localStorage.getItem('custom-rendezvous-server')  || !localStorage.getItem('key') ) {
	 						localStorage.setItem('custom-rendezvous-server', res.data.id_server)
							localStorage.setItem('key', res.data.key)
							}	
                         
						  if (res.data.peers) {
							  localStorage.setItem('peers', JSON.stringify(res.data.peers))
					      }
                      }
                  })
              } else {
                  autoWriteServer()
              }
          }, 1000)
      }
		autoWriteServer()
`
	c.String(200, tmp)
}
