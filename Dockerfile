FROM alpine

ARG BUILDARCH
WORKDIR /app
RUN apk add --no-cache tzdata file
COPY ./${BUILDARCH}/release /app/
RUN file /app/apimain
VOLUME /app/data

EXPOSE 21114
CMD ["./apimain"]
