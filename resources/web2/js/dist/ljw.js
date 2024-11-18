window._gwen = {}
window._gwen.kv = {}
const storage_prefix = 'wc-'
const apiserver = localStorage.getItem('wc-api-server')

function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
}

function getQueryVariable() {
    const query = window.location.hash.substring(3);
    const vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        window._gwen.kv[pair[0]] = pair[1]
    }
}

getQueryVariable()

/*const id = window._gwen.kv.id || ''
if (id) {
    localStorage.setItem(storage_prefix+'option:local:last_remote_id', id)
}*/
const share_token = window._gwen.kv.share_token || ''
if (share_token) {
    fetch(apiserver + "/api/shared-peer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({share_token})
    }).then(res => res.json()).then(res => {
        if (res.code === 0) {
            localStorage.setItem(storage_prefix + 'custom-rendezvous-server', res.data.id_server)
            localStorage.setItem(storage_prefix + 'key', res.data.key)
            const peer = res.data.peer || {}
            /*const s = {
                id: peer.info.id,
                password: peer.tmppwd,
            }*/
            //修改location
            window.location.href = `/webclient2/#/${peer.info.id}?password=${peer.tmppwd}`
        }
    })
}

let fetching = false

export function getServerConf(token) {
    if (!token) {
        return
    }

    console.log('getServerConf', token)
    if (fetching) {
        return
    }
    fetching = true
    fetch(apiserver + "/api/server-config-v2", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(res => res.json()).then(res => {
        fetching = false
        if (res.code === 0) {
            if (!localStorage.getItem(storage_prefix + 'custom-rendezvous-server') || !localStorage.getItem('key')) {
                localStorage.setItem(storage_prefix + 'custom-rendezvous-server', res.data.id_server)
                localStorage.setItem(storage_prefix + 'key', res.data.key)
            }
        }
    }).catch(_ => {
        fetching = false
    })
}
