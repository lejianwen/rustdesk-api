#!/bin/sh

STATIC_FILES_DIR=${STATIC_FILES_DIR:-/app/resources}

# 生成 config.js 文件，用于存放环境变量
cat <<EOF > ${STATIC_FILES_DIR}/admin/config.js
window.APP_CONFIG = {
    title: "${RUSTDESK_API_APP_NAME:-Rustdesk-Api-Admin}",
  };
EOF

exec "$@"