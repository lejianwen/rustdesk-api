Source: rustdesk-api-server
Section: net
Priority: optional
Maintainer: ymwl <ymwlpoolc@qq.com>
Build-Depends: debhelper (>= 10), pkg-config
Standards-Version: 4.5.0
Homepage: https://github.com/lejianwen/rustdesk-api/

Package: rustdesk-api-server
Architecture: {{ ARCH }}
Depends: systemd ${misc:Depends}
Description: RustDesk api server
 RustDesk api server, it is free and open source.
