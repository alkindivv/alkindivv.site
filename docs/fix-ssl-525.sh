#!/bin/bash

# Script Perbaikan Error 525 CloudFlare SSL
# Jalankan dengan: sudo bash fix-ssl-525.sh

echo "🔧 Memperbaiki Error 525 CloudFlare SSL"
echo "======================================"

# 1. Cek status Nginx
echo "📊 Checking Nginx status..."
systemctl status nginx --no-pager

# 2. Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

# 3. Cek SSL certificate
echo "🔐 Checking SSL certificate..."
if [ -f "/etc/nginx/ssl/alkind.id.crt" ]; then
    echo "✅ SSL certificate exists"
    openssl x509 -in /etc/nginx/ssl/alkind.id.crt -text -noout | grep -A 2 "Subject:"
else
    echo "❌ SSL certificate not found, generating new one..."
    mkdir -p /etc/nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/alkind.id.key \
        -out /etc/nginx/ssl/alkind.id.crt \
        -subj "/C=ID/ST=Jakarta/L=Jakarta/O=AL KINDI/OU=IT Department/CN=alkind.id"
fi

# 4. Fix SSL certificate dengan SAN
echo "🔧 Creating SSL certificate with SAN..."
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

# Generate new certificate with SAN
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/alkind.id.key \
    -out /etc/nginx/ssl/alkind.id.crt \
    -config /tmp/ssl.conf \
    -extensions v3_req

# 5. Update Nginx configuration untuk CloudFlare compatibility
echo "🌐 Updating Nginx configuration..."
cat > /etc/nginx/sites-available/alkind.id << 'EOF'
# Konfigurasi Nginx untuk alkind.id dengan CloudFlare SSL
server {
    listen 80;
    listen [::]:80;
    server_name alkind.id;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name alkind.id;

    # SSL Configuration yang kompatibel dengan CloudFlare
    ssl_certificate /etc/nginx/ssl/alkind.id.crt;
    ssl_certificate_key /etc/nginx/ssl/alkind.id.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;

    # CloudFlare Real IP Configuration
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 2400:cb00::/32;
    set_real_ip_from 2606:4700::/32;
    set_real_ip_from 2803:f800::/32;
    set_real_ip_from 2405:b500::/32;
    set_real_ip_from 2405:8100::/32;
    set_real_ip_from 2c0f:f248::/32;
    set_real_ip_from 2a06:98c0::/29;
    real_ip_header CF-Connecting-IP;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy ke Next.js
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

        # CloudFlare headers
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
        proxy_set_header CF-Ray $http_cf_ray;
        proxy_set_header CF-Visitor $http_cf_visitor;

        # Timeouts
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Logging
    access_log /var/log/nginx/alkind.id.access.log;
    error_log /var/log/nginx/alkind.id.error.log;
}
EOF

# 6. Test konfigurasi baru
echo "🧪 Testing new Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"

    # 7. Reload Nginx
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx

    # 8. Test SSL locally
    echo "🧪 Testing SSL locally..."
    echo | openssl s_client -connect localhost:443 -servername alkind.id 2>/dev/null | openssl x509 -noout -subject

    echo ""
    echo "🎉 SSL Configuration Fixed!"
    echo "=========================="
    echo ""
    echo "📋 Next Steps:"
    echo "1. Wait 1-2 minutes for changes to take effect"
    echo "2. Test website: https://alkind.id"
    echo "3. Check CloudFlare SSL mode is set to 'Full'"
    echo ""
    echo "🔧 If still getting Error 525:"
    echo "1. Set CloudFlare SSL mode to 'Flexible' temporarily"
    echo "2. Wait 5 minutes, then set back to 'Full'"
    echo ""
    echo "📊 Monitoring commands:"
    echo "- tail -f /var/log/nginx/alkind.id.error.log"
    echo "- curl -I https://alkind.id"
    echo "- openssl s_client -connect alkind.id:443"

else
    echo "❌ Nginx configuration has errors"
    echo "Please check the configuration manually"
fi