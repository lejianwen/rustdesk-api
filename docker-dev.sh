#!/bin/bash
set -e

# Define Docker Compose file and cache option
COMPOSE_FILE_NAME="docker-compose-dev.yaml"
CACHE=""
# Uncomment the next line to enable no-cache option
# CACHE="--no-cache"

# Define the base Docker Compose command
DCS="docker compose -f ${COMPOSE_FILE_NAME}"

# Function to build and start services
build_and_run() {
    echo "Building services..."
    if ! $DCS build ${CACHE}; then
        echo "Error: Failed to build services"
        exit 1
    fi

    echo "Starting services..."
    if ! $DCS up -d; then
        echo "Error: Failed to start services"
        exit 1
    fi
    echo "Services started successfully"
    echo "If you want to stop the services, run"
    echo "docker compose -f ${COMPOSE_FILE_NAME} down"

    echo "If you want to see the logs, run"
    echo "docker compose -f ${COMPOSE_FILE_NAME} logs -f"
}

# Execute build and start function
build_and_run