FROM alpine

ARG BUILDARCH
WORKDIR /app
# Set environment variables
ENV STATIC_FILES_DIR=/app/resources  RUSTDESK_API_APP_NAME=Rustdesk-Api-Admin

# Install necessary runtime dependencies
RUN apk add --no-cache tzdata file

# Copy the built application from the builder stage
COPY ./${BUILDARCH}/release /app/

# Copy the entrypoint script
COPY scripts/entrypoint.sh /entrypoint.sh

# Run the binary and make the entrypoint script executable
RUN file /app/apimain && chmod +x /entrypoint.sh

# Set up a volume for persistent data
VOLUME /app/data
EXPOSE 21114

ENTRYPOINT ["/entrypoint.sh"]
CMD ["./apimain"]
