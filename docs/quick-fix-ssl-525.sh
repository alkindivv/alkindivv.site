#!/bin/bash

# Quick Fix untuk Error 525 CloudFlare SSL
# Hanya untuk alkind.id (tanpa www)

echo "🚀 Quick Fix SSL 525 - alkind.id"
echo "================================"

# 1. Generate SSL certificate baru dengan konfigurasi yang benar
echo "🔐 Generating new SSL certificate..."
mkdir -p /etc/nginx/ssl

# Create SSL config
cat > /tmp/ssl.conf << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = ID
ST = Jakarta
L = Jakarta
O = AL KINDI
OU = IT Department
CN = alkind.id

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = alkind.id
EOF

# Generate certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/alkind.id.key \
    -out /etc/nginx/ssl/alkind.id.crt \
    -config /tmp/ssl.conf \
    -extensions v3_req

# 2. Update Nginx configuration (simple version)
echo "🌐 Updating Nginx configuration..."
cat > /etc/nginx/sites-available/alkind.id << 'EOF'
server {
    listen 80;
    server_name alkind.id;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name alkind.id;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/alkind.id.crt;
    ssl_certificate_key /etc/nginx/ssl/alkind.id.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

    # CloudFlare Real IP
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 131.0.72.0/22;
    real_ip_header CF-Connecting-IP;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:9999;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Logging
    access_log /var/log/nginx/alkind.id.access.log;
    error_log /var/log/nginx/alkind.id.error.log;
}
EOF

# 3. Enable site dan test
echo "🔗 Enabling site..."
ln -sf /etc/nginx/sites-available/alkind.id /etc/nginx/sites-enabled/

# 4. Test configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration OK, reloading Nginx..."
    systemctl reload nginx

    echo ""
    echo "🎉 SSL Fixed!"
    echo "============="
    echo ""
    echo "📋 Next Steps:"
    echo "1. Test: https://alkind.id"
    echo "2. Check CloudFlare SSL mode: 'Full' or 'Full (strict)'"
    echo ""
    echo "🔧 If still Error 525:"
    echo "Set CloudFlare SSL to 'Flexible' temporarily"
    echo ""
    echo "📊 Debug commands:"
    echo "tail -f /var/log/nginx/alkind.id.error.log"
    echo "curl -I https://alkind.id"

else
    echo "❌ Nginx configuration error!"
    nginx -t
fi