package main

//go:generate swag init -g cmd/apimain.go --output docs/api --instanceName api --exclude http/controller/admin
//go:generate swag init -g cmd/apimain.go --output docs/admin --instanceName admin --exclude http/controller/api
//go:generate go run cmd/apimain.go
