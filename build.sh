#!/bin/sh

rm release -rf
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w CGO_ENABLED=1
go env -w GOOS=linux
go env -w GOARCH=amd64
swag init -g cmd/apimain.go --output docs/api --instanceName api --exclude http/controller/admin
swag init -g cmd/apimain.go --output docs/admin --instanceName admin --exclude http/controller/api
go build -o release/apimain cmd/apimain.go
cp -ar resources release/
cp -ar docs release/
cp -ar conf release/
mkdir -p release/data
mkdir -p release/runtime
