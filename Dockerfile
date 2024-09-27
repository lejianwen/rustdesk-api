FROM alpine
WORKDIR /app
RUN apk update && apk add --no-cache tzdata
COPY ./release /app/
VOLUME /app/data

EXPOSE 21114
CMD ["./apimain"]
