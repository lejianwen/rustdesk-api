FROM golang:1.22-alpine as builder

RUN set -eux; \
    apk add --no-cache git gcc  build-base sqlite-dev npm nodejs; \
        git clone https://github.com/lejianwen/rustdesk-api-web; \
        git clone https://github.com/lejianwen/rustdesk-api; \
    #先编译后台
        cd rustdesk-api-web; \
        npm install; \
        npm run build; \
    cd ..; \
        mkdir -p rustdesk-api/resources/admin; \
        cp -ar rustdesk-api-web/dist/* rustdesk-api/resources/admin; \
        cd rustdesk-api; \
        go mod tidy; \
        go install github.com/swaggo/swag/cmd/swag@latest; \
    swag init -g cmd/apimain.go --output docs/api --instanceName api --exclude http/controller/admin; \
    swag init -g cmd/apimain.go --output docs/admin --instanceName admin --exclude http/controller/api; \
    go env -w GO111MODULE=on;\
    go env -w CGO_ENABLED=1;\
    go env -w GOOS=linux;\
    go env -w GOARCH=amd64;\
    go env -w CGO_LDFLAGS="-static"; \
    go build -o release/apimain cmd/apimain.go; \
    cp -ar resources release/; \
    mkdir -p release/resources/public; \
    cp -ar docs release/; \
    cp -ar conf release/; \
    mkdir -p release/data; \
    mkdir -p release/runtime;

VOLUME /app/data
FROM alpine
WORKDIR /app
RUN apk add --no-cache tzdata
COPY --from=builder /go/rustdesk-api/release /app/

EXPOSE 21114
CMD ["./apimain"]
