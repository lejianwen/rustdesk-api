#!/bin/sh

set -e
# Automatically get the current environment's GOARCH; if not defined, use the detected system architecture
GOARCH=${GOARCH:-$(go env GOARCH)}
DOCS="true"
# Safely remove the old release directory
rm -rf release

# Set Go environment variables
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w CGO_ENABLED=1
go env -w GOOS=linux
go env -w GOARCH=${GOARCH}


# Generate Swagger documentation if DOCS is not empty
if [ -n "${DOCS}" ]; then
    # Check if swag is installed
    if ! command -v swag &> /dev/null; then
        echo "swag command not found. Please install it using:"
        echo "go install github.com/swaggo/swag/cmd/swag@latest"
        echo "Skipping Swagger documentation generation due to missing swag tool."
    else
        echo "Generating Swagger documentation..."
        swag init -g cmd/apimain.go --output docs/api --instanceName api --exclude http/controller/admin
        swag init -g cmd/apimain.go --output docs/admin --instanceName admin --exclude http/controller/api
    fi
else
    echo "Skipping Swagger documentation generation due to DOCS is empty."
fi

# Compile the Go code and output it to the release directory
go build -o release/apimain cmd/apimain.go

# Copy resource files to the release directory
cp -ar resources release/
cp -ar docs release/
cp -ar conf release/

# Create necessary directory structures
mkdir -p release/data
mkdir -p release/runtime

echo "Build and setup completed successfully."