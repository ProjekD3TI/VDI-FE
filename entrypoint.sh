#!/bin/sh

echo "Generating runtime config..."

envsubst '
$API_BASE_URL
$REVERB_APP_KEY
$REVERB_HOST
$REVERB_PORT
$REVERB_SCHEME
' \
< /usr/share/nginx/html/config.template.js \
> /usr/share/nginx/html/config.js

exec nginx -g "daemon off;"