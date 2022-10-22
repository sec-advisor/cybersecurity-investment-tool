#!/bin/bash
envsubst < /usr/share/nginx/html/assets/config/config.template.json > /usr/share/nginx/html/assets/config/config.json && exec nginx -g 'daemon off;'
