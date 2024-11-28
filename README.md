# RustDesk API

[English Doc](README_EN.md)

本项目使用 Go 实现了 RustDesk 的 API，并包含了 Web Admin 和 Web 客户端。RustDesk 是一个远程桌面软件，提供了自托管的解决方案。

 <div align=center>
<img src="https://img.shields.io/badge/golang-1.22-blue"/>
<img src="https://img.shields.io/badge/gin-v1.9.0-lightBlue"/>
<img src="https://img.shields.io/badge/gorm-v1.25.7-green"/>
<img src="https://img.shields.io/badge/swag-v1.16.3-yellow"/>
<img src="https://github.com/lejianwen/rustdesk-api/actions/workflows/build.yml/badge.svg"/>
</div>

# 特性

- PC端API
    - 个人版API
    - 登录
    - 地址簿
    - 群组
    - 授权登录，支持`github`, `google` 和 `OIDC` 登录，支持`web后台`授权登录
    - i18n
- Web Admin
    - 用户管理
    - 设备管理
    - 地址簿管理
    - 标签管理
    - 群组管理
    - Oauth 管理
    - 登录日志
    - 链接日志
    - 文件传输日志
    - 快速使用web client
    - i18n
    - 通过 web client 分享给游客
- Web Client
    - 自动获取API server
    - 自动获取ID服务器和KEY
    - 自动获取地址簿
    - 游客通过临时分享链接直接远程到设备
    - v2 Preview
- CLI
    - 重置管理员密码

## 使用前准备

### [Rustdesk](https://github.com/rustdesk/rustdesk)

#### PC客户端使用的是 ***1.3.0***，经测试 ***1.2.6+*** 都可以

#### 关于PC端链接超时或者链接不上的问题以及解决方案
##### 链接不上或者超时
因为server端相对于客户端落后版本，server不会响应客户端的`secure_tcp`请求，所以客户端超时。
相关代码代码位置在`https://github.com/rustdesk/rustdesk/blob/master/src/client.rs#L322`
  ```rust
    if !key.is_empty() && !token.is_empty() {
    // mainly for the security of token
    allow_err!(secure_tcp(&mut socket, key).await);
    }
  ```
  可看到当`key`和`token`都不为空时，会调用`secure_tcp`，但是server端不会响应，所以客户端超时
  `secure_tcp` 代码位置在 `https://github.com/rustdesk/rustdesk/blob/master/src/common.rs#L1203`
  
##### 4种解决方案
1. server端指定key。
    - 优点：简单
    - 缺点：链接不是加密的
       ```bash
       hbbs -r <relay-server-ip[:port]> -k <key>
       hbbr -k <key>
       ```
       比如
       ```bash
         hbbs -r <relay-server-ip[:port]> -k abc1234567
         hbbr -k abc1234567
       ```
2. server端使用系统生成的key，或者自定义的密钥对，但如果client已登录，链接时容易超时或者链接不上，可以退出登录后再链接就可以了，webclient可以不用退出登录
    - 优点：链接加密
    - 缺点：操作麻烦
3. server端使用系统生成的key，或者自定义的密钥对，fork官方客户端的代码将`secure_tcp`修改成直接返回，然后通过`Github Actions`编译，下载编译后的客户端。
参考[官方文档](https://rustdesk.com/docs/en/dev/build/all/)
    - 优点：链接加密，可以自定义客户端一些功能，编译后直接可用
    - 缺点：需要自己fork代码，编译，有点难度
4. 使用[我fork的代码](https://github.com/lejianwen/rustdesk)，已经修改了`secure_tcp`，可以直接下载使用，[下载地址](https://github.com/lejianwen/rustdesk/releases)
    - 优点：代码改动可查看，`Github Actions`编译，链接加密，直接下载使用
    - 缺点：可能跟不上官方版本更新
     
***对链接加密要求不高的可以使用`1`，对链接加密要求高的可以使用`3`或`4`***

## 功能

### API 服务 
基本实现了PC端基础的接口。支持Personal版本接口，可以通过配置文件`rustdesk.personal`或环境变量`RUSTDESK_API_RUSTDESK_PERSONAL`来控制是否启用

#### 登录

- 添加了`github`, `google` 以及`OIDC`授权登录，需要在后台配置好就可以用了，具体可看后台OAuth配置
- 添加了web后台授权登录,点击后直接登录后台就自动登录客户端了

![pc_login](docs/pc_login.png)

#### 地址簿

![pc_ab](docs/pc_ab.png)

#### 群组
群组分为`共享组`和`普通组`，共享组中所有人都能看到小组成员的设备，普通组只有管理员能看到所有小组成员的设备

![pc_gr](docs/pc_gr.png)

### Web Admin:

* 使用前后端分离，提供用户友好的管理界面，主要用来管理和展示。前端代码在[rustdesk-api-web](https://github.com/lejianwen/rustdesk-api-web)

* 后台访问地址是`http://<your server>[:port]/_admin/`初次安装管理员为用户名密码为`admin` `admin`，请即时更改密码

1. 管理员界面
   ![web_admin](docs/web_admin.png)
2. 普通用户界面
   ![web_user](docs/web_admin_user.png)
   右上角可以更改密码,可以切换语言，可以切换`白天/黑夜`模式
   ![web_resetpwd](docs/web_resetpwd.png)

3. 分组可以自定义，方便管理，暂时支持两种类型: `共享组` 和 `普通组`
   ![web_admin_gr](docs/web_admin_gr.png)
4. 可以直接打开webclient，方便使用；也可以分享给游客，游客可以直接通过webclient远程到设备

   ![web_webclient](docs/admin_webclient.png)
5. Oauth,支持了`Github`, `Google` 以及 `OIDC`, 需要创建一个`OAuth App`，然后配置到后台
   ![web_admin_oauth](docs/web_admin_oauth.png)
    - 对于`Google` 和 `Github`, `Issuer` 和 `Scopes`不需要填写.
    - 对于`OIDC`, `Issuer`是必须的。`Scopes`是可选的，默认为 `openid,profile,email`. 确保可以获取 `sub`,`email` 和`preferred_username`
    - `github oauth app`在`Settings`->`Developer settings`->`OAuth Apps`->`New OAuth App`
      中创建,地址 [https://github.com/settings/developers](https://github.com/settings/developers)
    - `Authorization callback URL`填写`http://<your server[:port]>/api/oauth/callback`
      ，比如`http://127.0.0.1:21114/api/oauth/callback`

### Web Client:

1. 如果已经登录了后台，web client将自动直接登录
2. 如果没登录后台，点击右上角登录即可，api server已经自动配置好了
   ![webclient_conf](docs/webclient_conf.png)
3. 登录后，会自动同步ID服务器和KEY
4. 登录后，会将地址簿自动保存到web client中，方便使用
5. 现已支持`v2 Preview`，访问路径是`/webclient2`
   ![webclientv2](./docs/webclientv2.png)
6. `v2 preview` 部署 
   - 如果是通过`443`端口的`https`部署，必须配置反向代理，可以参考[官方文档](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client)
   - 如果是`http`或者其他的`https`端口部署，则和`v1`一样，配置好`21118`,`21119`即可
   - 更多参考[Web-Client-V2-Preview-Document](https://github.com/lejianwen/rustdesk-api/wiki/Web-Client-V2-Preview-Document)

### 自动化文档: 使用 Swag 生成 API 文档，方便开发者理解和使用 API。

1. 后台文档 `<youer server[:port]>/admin/swagger/index.html`
2. PC端文档 `<youer server[:port]>/swagger/index.html`
   ![api_swag](docs/api_swag.png)

### CLI
```bash
# 查看帮助
./apimain -h
```

#### 重置管理员密码
```bash
./apimain reset-admin-pwd <pwd>
```

## 安装与运行

### 相关配置

* 参考`conf/config.yaml`配置文件，修改相关配置。
* 如果`gorm.type`是`sqlite`，则不需要配置mysql相关配置。
* 语言如果不设置默认为`zh-CN`

```yaml
lang: "en"
app:
  web-client: 1  # 1:启用 0:禁用
  register: false #是否开启注册
gin:
  api-addr: "0.0.0.0:21114"
  mode: "release"
  resources-path: 'resources'
  trust-proxy: ""
gorm:
  type: "sqlite"
  max-idle-conns: 10
  max-open-conns: 100
mysql:
  username: "root"
  password: "111111"
  addr: "192.168.1.66:3308"
  dbname: "rustdesk"
rustdesk:
  id-server: "192.168.1.66:21116"
  relay-server: "192.168.1.66:21117"
  api-server: "http://192.168.1.66:21114"
  key: "123456789"
  personal: 1
logger:
  path: "./runtime/log.txt"
  level: "warn" #trace,debug,info,warn,error,fatal
  report-caller: true
proxy:
  enable: false
  host: ""
```

### 环境变量
变量名前缀是`RUSTDESK_API`，环境变量如果存在将覆盖配置文件中的配置

| 变量名                                | 说明                                                      | 示例                           |
|------------------------------------|---------------------------------------------------------|------------------------------|
| TZ                                 | 时区                                                      | Asia/Shanghai                |
| RUSTDESK_API_LANG                  | 语言                                                      | `en`,`zh-CN`                 |
| RUSTDESK_API_APP_WEB_CLIENT        | 是否启用web-client; 1:启用,0:不启用; 默认启用                        | 1                            |
| RUSTDESK_API_APP_REGISTER          | 是否开启注册; `true`, `false`  默认`false`                      | `false`                      |
| -----ADMIN配置-----                  | ----------                                              | ----------                   |
| RUSTDESK_API_ADMIN_TITLE           | 后台标题                                                    | `RustDesk Api Admin`         |
| RUSTDESK_API_ADMIN_HELLO           | 后台欢迎语，可以使用`html`                                        |                              |
| RUSTDESK_API_ADMIN_HELLO_FILE      | 后台欢迎语文件，如果内容多，使用文件更方便。<br>会覆盖`RUSTDESK_API_ADMIN_HELLO` | `./conf/admin/hello.html`    |
| -----GIN配置-----                    | ----------                                              | ----------                   |
| RUSTDESK_API_GIN_TRUST_PROXY       | 信任的代理IP列表，以`,`分割，默认信任所有                                 | 192.168.1.2,192.168.1.3      |
| -----------GORM配置----------------  | ------------------------------------                    | ---------------------------  |
| RUSTDESK_API_GORM_TYPE             | 数据库类型sqlite或者mysql，默认sqlite                             | sqlite                       |
| RUSTDESK_API_GORM_MAX_IDLE_CONNS   | 数据库最大空闲连接数                                              | 10                           |
| RUSTDESK_API_GORM_MAX_OPEN_CONNS   | 数据库最大打开连接数                                              | 100                          |
| RUSTDESK_API_RUSTDESK_PERSONAL     | 是否启用个人版API， 1:启用,0:不启用； 默认启用                            | 1                            |
| -----MYSQL配置-----                  | ----------                                              | ----------                   |
| RUSTDESK_API_MYSQL_USERNAME        | mysql用户名                                                | root                         |
| RUSTDESK_API_MYSQL_PASSWORD        | mysql密码                                                 | 111111                       |
| RUSTDESK_API_MYSQL_ADDR            | mysql地址                                                 | 192.168.1.66:3306            |
| RUSTDESK_API_MYSQL_DBNAME          | mysql数据库名                                               | rustdesk                     |
| -----RUSTDESK配置-----               | ---------------                                         | ----------                   |
| RUSTDESK_API_RUSTDESK_ID_SERVER    | Rustdesk的id服务器地址                                        | 192.168.1.66:21116           |
| RUSTDESK_API_RUSTDESK_RELAY_SERVER | Rustdesk的relay服务器地址                                     | 192.168.1.66:21117           |
| RUSTDESK_API_RUSTDESK_API_SERVER   | Rustdesk的api服务器地址                                       | http://192.168.1.66:21114    |
| RUSTDESK_API_RUSTDESK_KEY          | Rustdesk的key                                            | 123456789                    |
| RUSTDESK_API_RUSTDESK_KEY_FILE     | Rustdesk存放key的文件                                        | `./conf/data/id_ed25519.pub` |
| ----PROXY配置-----                   | ---------------                                         | ----------                   |
| RUSTDESK_API_PROXY_ENABLE          | 是否启用代理:`false`, `true`                                  | `false`                      |
| RUSTDESK_API_PROXY_HOST            | 代理地址                                                    | `http://127.0.0.1:1080`      |


### 运行

#### docker运行

1. 直接docker运行,配置可以通过挂载配置文件`/app/conf/config.yaml`来修改,或者通过环境变量覆盖配置文件中的配置

    ```bash
    docker run -d --name rustdesk-api -p 21114:21114 \
    -v /data/rustdesk/api:/app/data \
    -e TZ=Asia/Shanghai \
    -e RUSTDESK_API_LANG=zh-CN \
    -e RUSTDESK_API_RUSTDESK_ID_SERVER=192.168.1.66:21116 \
    -e RUSTDESK_API_RUSTDESK_RELAY_SERVER=192.168.1.66:21117 \
    -e RUSTDESK_API_RUSTDESK_API_SERVER=http://192.168.1.66:21114 \
    -e RUSTDESK_API_RUSTDESK_KEY=<key> \
    lejianwen/rustdesk-api
    ```

2. 使用`docker compose`
   - 简单示例
   ```yaml
   services:
      rustdesk-api:
       container_name: rustdesk-api
       environment:
         - TZ=Asia/Shanghai
         - RUSTDESK_API_RUSTDESK_ID_SERVER=192.168.1.66:21116
         - RUSTDESK_API_RUSTDESK_RELAY_SERVER=192.168.1.66:21117
         - RUSTDESK_API_RUSTDESK_API_SERVER=http://192.168.1.66:21114
         - RUSTDESK_API_RUSTDESK_KEY=<key>
       ports:
         - 21114:21114
       image: lejianwen/rustdesk-api
       volumes:
         - /data/rustdesk/api:/app/data #将数据库挂载出来方便备份
       networks:
         - rustdesk-net
       restart: unless-stopped
   ```

   - 根据rustdesk官方提供的示例，加上自己的rustdesk-api
     - 如果是使用的系统生成的KEY，去掉`-k <key>`参数，在启动后运行`docker-compose logs hbbs`或者`cat ./data/id_ed25519.pub`查看KEY，然后再修改`RUSTDESK_API_RUSTDESK_KEY=<key>`再执行`docker-compose up -d`
      ```yaml
      networks:
        rustdesk-net:
          external: false
      services:
        hbbs:
          container_name: hbbs
          ports:
            - 21115:21115
            - 21116:21116 # 自定义 hbbs 映射端口
            - 21116:21116/udp # 自定义 hbbs 映射端口
            - 21118:21118 # web client
          image: rustdesk/rustdesk-server
          command: hbbs -r <relay-server-ip[:port]> -k <key> # 填入个人域名或 IP + hbbr 暴露端口
          volumes:
            - ./data:/root # 自定义挂载目录
          networks:
            - rustdesk-net
          depends_on:
            - hbbr
          restart: unless-stopped
          deploy:
            resources:
              limits:
                memory: 64M
        hbbr:
          container_name: hbbr
          ports:
            - 21117:21117 # 自定义 hbbr 映射端口
            - 21119:21119 # web client
          image: rustdesk/rustdesk-server
          command: hbbr -k <key>
          volumes:
            - ./data:/root
          networks:
            - rustdesk-net
          restart: unless-stopped
          deploy:
            resources:
              limits:
                memory: 64M
        rustdesk-api:
          container_name: rustdesk-api
          environment:
            - TZ=Asia/Shanghai
            - RUSTDESK_API_RUSTDESK_ID_SERVER=192.168.1.66:21116
            - RUSTDESK_API_RUSTDESK_RELAY_SERVER=192.168.1.66:21117
            - RUSTDESK_API_RUSTDESK_API_SERVER=http://192.168.1.66:21114
            - RUSTDESK_API_RUSTDESK_KEY=<key>
          ports:
            - 21114:21114
          image: lejianwen/rustdesk-api
          volumes:
            - /data/rustdesk/api:/app/data #将数据库挂载出来方便备份
          networks:
            - rustdesk-net
          restart: unless-stopped
      ```
     
   - S6的镜像
     - 如果使用***自定义KEY***，会需要修改启动脚本，覆盖镜像中的`/etc/s6-overlay/s6-rc.d/hbbr/run`和`/etc/s6-overlay/s6-rc.d/hbbr/run`
         1. 创建`hbbr/run`，自定义KEY才需要
            ```bash
            #!/command/with-contenv sh
            cd /data
            PARAMS=
            [ "${ENCRYPTED_ONLY}" = "1" ] && PARAMS="-k ${KEY}"
            /usr/bin/hbbr $PARAMS
            ```
         2. 创建`hbbs/run`，自定义KEY才需要
             ```bash
             #!/command/with-contenv sh
             sleep 2
             cd /data
             PARAMS=
             [ "${ENCRYPTED_ONLY}" = "1" ] && PARAMS="-k ${KEY}"
             /usr/bin/hbbs -r $RELAY $PARAMS
             ```
         3. 修改`docker-compose.yml`中的`s6`部分
         ```yaml
         networks:
           rustdesk-net:
             external: false
         services:
           rustdesk-server:
             container_name: rustdesk-server
             ports:
               - 21115:21115
               - 21116:21116
               - 21116:21116/udp
               - 21117:21117
               - 21118:21118
               - 21119:21119
             image: rustdesk/rustdesk-server-s6:latest
             environment:
               - RELAY=192.168.1.66:21117
               - ENCRYPTED_ONLY=1
               - KEY=<key>  #自定义KEY
             volumes:
               - ./data:/data
               - ./hbbr/run:/etc/s6-overlay/s6-rc.d/hbbr/run 
               - ./hbbs/run:/etc/s6-overlay/s6-rc.d/hbbs/run 
             restart: unless-stopped
           rustdesk-api:
             container_name: rustdesk-api
             ports:
               - 21114:21114
             image: lejianwen/rustdesk-api
             environment:
               - TZ=Asia/Shanghai
               - RUSTDESK_API_RUSTDESK_ID_SERVER=192.168.1.66:21116
               - RUSTDESK_API_RUSTDESK_RELAY_SERVER=192.168.1.66:21117
               - RUSTDESK_API_RUSTDESK_API_SERVER=http://192.168.1.66:21114
               - RUSTDESK_API_RUSTDESK_KEY=<key>
             volumes:
               - /data/rustdesk/api:/app/data #将数据库挂载
             networks:
               - rustdesk-net
             restart: unless-stopped
         ```
   - 如果使用***系统生成的KEY***或者***自定义KEY_PUB,KEY_PRIV***，不需要修改启动脚本，但要在生成KEY后获取到KEY再`docker-compose up -d`
       ```yaml
       networks:
         rustdesk-net:
           external: false
       services:
         rustdesk-server:
           container_name: rustdesk-server
           ports:
             - 21115:21115
             - 21116:21116
             - 21116:21116/udp
             - 21117:21117
             - 21118:21118
             - 21119:21119
           image: rustdesk/rustdesk-server-s6:latest
           environment:
             - RELAY=192.168.1.66:21117
             - ENCRYPTED_ONLY=1
           volumes:
             - ./data:/data
           restart: unless-stopped
         rustdesk-api:
           container_name: rustdesk-api
           ports:
             - 21114:21114
           image: lejianwen/rustdesk-api
           environment:
             - TZ=Asia/Shanghai
             - RUSTDESK_API_RUSTDESK_ID_SERVER=192.168.1.66:21116
             - RUSTDESK_API_RUSTDESK_RELAY_SERVER=192.168.1.66:21117
             - RUSTDESK_API_RUSTDESK_API_SERVER=http://192.168.1.66:21114
             - RUSTDESK_API_RUSTDESK_KEY=<key> #系统生成的KEY
           volumes:
             - /data/rustdesk/api:/app/data #将数据库挂载
           networks:
             - rustdesk-net
           restart: unless-stopped
       ```
#### 下载release直接运行

[下载地址](https://github.com/lejianwen/rustdesk-api/releases)

#### 源码安装

1. 克隆仓库
   ```bash
   git clone https://github.com/lejianwen/rustdesk-api.git
   cd rustdesk-api
   ```

2. 安装依赖

    ```bash
    go mod tidy
    #安装swag，如果不需要生成文档，可以不安装
    go install github.com/swaggo/swag/cmd/swag@latest
    ```

3. 编译后台前端，前端代码在[rustdesk-api-web](https://github.com/lejianwen/rustdesk-api-web)中
   ```bash
   cd resources
   mkdir -p admin
   git clone https://github.com/lejianwen/rustdesk-api-web
   cd rustdesk-api-web
   npm install
   npm run build
   cp -ar dist/* ../admin/
   ```
4. 运行
    ```bash
    #直接运行
    go run cmd/apimain.go
    #或者使用generate_api.go生成api并运行
    go generate generate_api.go
    ```
5. 编译，如果想自己编译,先cd到项目根目录，然后windows下直接运行`build.bat`,linux下运行`build.sh`,编译后会在`release`
   目录下生成对应的可执行文件。直接运行编译后的可执行文件即可。

6. 打开浏览器访问`http://<your server[:port]>/_admin/`，默认用户名密码为`admin`，请及时更改密码。

#### nginx反代
在`nginx`中配置反代
```
server {
    listen <your port>;
    server_name <your server>;
    location / {
        proxy_pass http://<api-server[:port]>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
## 其他

- [修改客户端ID](https://github.com/abdullah-erturk/RustDesk-ID-Changer)
- [webclient来源](https://hub.docker.com/r/keyurbhole/flutter_web_desk)