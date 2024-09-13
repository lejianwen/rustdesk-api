@echo off
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w CGO_ENABLED=1
go env -w GOOS=windows
go env -w GOARCH=amd64
swag init -g cmd/apimain.go --output docs/api --instanceName api --exclude http/controller/admin
swag init -g cmd/apimain.go --output docs/admin --instanceName admin --exclude http/controller/api
go build -o release/apimain.exe cmd/apimain.go
xcopy resources release\resources /E /I /Y
xcopy docs release\docs /E /I /Y
xcopy data release\data /E /I /Y
xcopy conf release\conf /E /I /Y
xcopy runtime release\runtime /E /I /Y
