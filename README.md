# RustDesk API
[English Doc](README_EN.md)

本项目使用 Go 实现了 RustDesk 的 API，并包含了 Web UI 和 Web 客户端。RustDesk 是一个远程桌面软件，提供了自托管的解决方案。

 <div align=center>
<img src="https://img.shields.io/badge/golang-1.22-blue"/>
<img src="https://img.shields.io/badge/gin-v1.9.0-lightBlue"/>
<img src="https://img.shields.io/badge/gorm-v1.25.7-green"/>
<img src="https://img.shields.io/badge/swag-v1.16.3-yellow"/>
</div>

## 使用前准备

### [Rustdesk](https://github.com/rustdesk/rustdesk)

1. PC客户端使用的是 ***1.3.0***，经测试 ***1.2.6+*** 都可以
2. server端必须指定key，不能用自带的生成的key,否则可能链接不上或者超时

```bash
hbbs -r <relay-server-ip[:port]> -k 123456789
hbbr -k 123456789
```

## 功能

### **API 服务**: 基本实现了PC端基础的接口。

![pc_ab](docs/pc_ab.png)
![pc_gr](docs/pc_gr.png)

### **Web UI**: 使用前后端分离，提供用户友好的管理界面，主要用来管理和展示。

***前端代码在[rustdesk-api-web](https://github.com/lejianwen/rustdesk-api-web)***

***后台访问地址是`http://<your server>:21114/_admin/`初次安装管理员为用户名密码为`admin admin`，请即时更改密码***

1. 管理员界面
   ![web_admin](docs/web_admin.png)
2. 普通用户界面
   ![web_user](docs/web_user.png)
3. 更改密码在右上角

   ![web_resetpwd](docs/web_resetpwd.png)

4. 分组可以自定义，方便管理，暂时支持两种类型: `共享组` 和 `普通组`

   ![web_admin_gr](docs/web_admin_gr.png)

### **Web 客户端**:

1. 如果已经登录了后台，web client将自动直接登录
2. 如果没登录后台，点击右上角登录即可，api server已经自动配置好了
3. 登录后台后，会将地址簿自动保存到web client中，方便使用
   ![webclient_conf](docs/webclient_conf.png)

### **自动化文档**: 使用 Swag 生成 API 文档，方便开发者理解和使用 API。

1. 后台文档 <youer server>/admin/swagger/index.html
2. PC端文档 <youer server>/swagger/index.html
   ![api_swag](docs/api_swag.png)

## 安装与运行

### 相关配置

* 参考`conf/config.yaml`配置文件，修改相关配置。如果`gorm.type`是`sqlite`，则不需要配置mysql相关配置。

```yaml
gin:
  api-addr: "0.0.0.0:21114"
  mode: "release"
  resources-path: 'resources'
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
```

### 安装步骤

#### docker运行

1. 直接docker运行

```bash
docker run -d --name rustdesk-api -p 21114:21114 -v /data/rustdesk/api:/app/data lejianwen/rustdesk-api
```

- 环境变量，变量名前缀是RUSTDESK_API

| 变量名                                 | 说明                                            | 示例                          |
|:------------------------------------|:----------------------------------------------|-----------------------------|
| -----------GORM配置------------------ | --------------------------------------------- | --------------------------- |
| RUSTDESK_API_GORM_TYPE              | 数据库类型sqlite或者mysql，默认sqlite                   | sqlite                      |
| RUSTDESK_API_GORM_MAX_IDLE_CONNS    | 数据库最大空闲连接数                                    | 10                          |
| RUSTDESK_API_GORM_MAX_OPEN_CONNS    | 数据库最大打开连接数                                    | 100                         |
| -----------MYSQL配置----------------- | -------------数据库类型为sqlite时不用填--------------   | ----------                  |
| RUSTDESK_API_MYSQL_USERNAME         | mysql用户名                                      | root                        |
| RUSTDESK_API_MYSQL_PASSWORD         | mysql密码                                       | 111111                      |
| RUSTDESK_API_MYSQL_ADDR             | mysql地址                                       | 192.168.1.66:3306           |
| RUSTDESK_API_MYSQL_DBNAME           | mysql数据库名                                     | rustdesk                    |
| -----------RUSTDESK配置-------------- | -------------------------------------------   | ----------                  |
| RUSTDESK_API_RUSTDESK_ID_SERVER     | Rustdesk的id服务器地址                              | 192.168.1.66:21116          |
| RUSTDESK_API_RUSTDESK_RELAY_SERVER  | Rustdesk的relay服务器地址                           | 192.168.1.66:21117          |
| RUSTDESK_API_RUSTDESK_API_SERVER    | Rustdesk的api服务器地址                             | http://192.168.1.66:21114   |
| RUSTDESK_API_RUSTDESK_KEY           | Rustdesk的key                                  | 123456789                   |

2. 使用`docker compose`,根据rustdesk提供的示例加上自己的rustdesk-api

```docker-compose
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
      - 21118:21118 # web client 需要
    image: rustdesk/rustdesk-server
    command: hbbs -r <relay-server-ip[:port]> -k 123456789 # 填入个人域名或 IP + hbbr 暴露端口
    volumes:
      - /data/rustdesk/hbbs:/root # 自定义挂载目录
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
    image: rustdesk/rustdesk-server
    command: hbbr -k 123456789
    #command: hbbr
    volumes:
      - /data/rustdesk/hbbr:/root # 自定义挂载目录
    networks:
      - rustdesk-net
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 64M
  rustdesk-api:
    container_name: rustdesk-api
    ports:
      - 21114:21114
    image: lejianwen/rustdesk-api
    volumes:
      - /data/rustdesk/api:/app/data #将数据库挂载出来方便备份
    networks:
      - rustdesk-net
    restart: unless-stopped

```

#### 下载release直接运行

下载地址[release](https://github.com/lejianwen/rustdesk-api/releases)

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

6. 打开浏览器访问`http://<your server>:21114/_admin/`，默认用户名密码为`admin`，请及时更改密码。

## 其他

- [修改客户端ID](https://github.com/abdullah-erturk/RustDesk-ID-Changer)
- [webclient](https://hub.docker.com/r/keyurbhole/flutter_web_desk)