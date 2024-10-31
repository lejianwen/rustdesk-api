#!/bin/bash

FILE_NAME="docker-compose-dev.yaml"

# CACHE="--no-cache"

docker compose -f ${FILE_NAME} build ${CACHE} 
docker compose -f ${FILE_NAME} up -d