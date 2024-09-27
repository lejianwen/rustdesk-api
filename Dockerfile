FROM golang:1.22-alpine as builder

FROM alpine
WORKDIR /app
RUN apk add --no-cache tzdata
COPY rustdesk-api/release /app/
VOLUME /app/data

EXPOSE 21114
CMD ["./apimain"]
