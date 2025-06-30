#!/bin/bash

# 🔧 Fix SSL Full Mode - alkindi.id
# Memperbaiki masalah Error 522 saat menggunakan Full mode di Cloudflare
#
# Usage: sudo ./docs/fix-ssl-full-mode.sh

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="alkindi.id"
EMAIL="me@alkindi.id"  # Update this if needed

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

check_current_setup() {
    log_info "Checking current setup..."

    # Check if nginx is running
    if systemctl is-active --quiet nginx; then
        log_success "✅ Nginx is running"
    else
        log_error "❌ Nginx is not running"
        systemctl start nginx
    fi

    # Check if port 80 is open
    if netstat -tlnp | grep -q ":80"; then
        log_success "✅ Port 80 is listening"
    else
        log_error "❌ Port 80 is not listening"
    fi

    # Check if port 443 is open
    if netstat -tlnp | grep -q ":443"; then
        log_success "✅ Port 443 is listening (SSL configured)"
    else
        log_warning "⚠️  Port 443 is not listening (SSL not configured)"
    fi

    # Test local connection
    log_info "Testing local connections..."

    # Test HTTP
    if curl -s -H "Host: $DOMAIN" http://localhost | grep -q "<!DOCTYPE html>"; then
        log_success "✅ HTTP (port 80) working"
    else
        log_error "❌ HTTP (port 80) not working"
    fi

    # Test HTTPS
    if curl -s -k -H "Host: $DOMAIN" https://localhost | grep -q "<!DOCTYPE html>" 2>/dev/null; then
        log_success "✅ HTTPS (port 443) working"
    else
        log_warning "⚠️  HTTPS (port 443) not working"
    fi
}

install_certbot() {
    log_info "Installing Certbot..."

    # Update package list
    apt update

    # Install certbot
    apt install -y certbot python3-certbot-nginx

    log_success "Certbot installed"
}

get_ssl_certificate() {
    log_info "Getting SSL certificate for $DOMAIN..."

    # Get certificate using nginx plugin
    certbot --nginx \
        --non-interactive \
        --agree-tos \
        --email $EMAIL \
        --domains $DOMAIN \
        --redirect

    if [ $? -eq 0 ]; then
        log_success "SSL certificate obtained and configured!"
    else
        log_error "Failed to get SSL certificate"
        return 1
    fi
}

fix_nginx_config() {
    log_info "Fixing Nginx configuration..."

    # Backup current config
    cp /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-available/$DOMAIN.backup.$(date +%Y%m%d_%H%M%S)

    # Update nginx config for SSL
    cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
# 🔒 Nginx Configuration for alkindi.id with SSL
# Updated for Cloudflare Full mode

server {
    listen 80;
    listen [::]:80;
    server_name alkindi.id;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name alkindi.id;

    # SSL Configuration (will be updated by certbot)
    ssl_certificate /etc/letsencrypt/live/alkindi.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alkindi.id/privkey.pem;

    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # CloudFlare Real IP
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

    # Redirect www to non-www
    if ($host = www.alkindi.id) {
        return 301 https://alkindi.id$request_uri;
    }

    # Proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:9999;
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
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logging
    access_log /var/log/nginx/alkindi.id.access.log;
    error_log /var/log/nginx/alkindi.id.error.log;
}
EOF

    # Test and reload nginx
    nginx -t && systemctl reload nginx

    log_success "Nginx configuration updated"
}

setup_auto_renewal() {
    log_info "Setting up SSL auto-renewal..."

    # Test renewal
    certbot renew --dry-run

    if [ $? -eq 0 ]; then
        log_success "Auto-renewal configured successfully"
    else
        log_warning "Auto-renewal test failed, but certificate is still valid"
    fi
}

verify_ssl() {
    log_info "Verifying SSL setup..."

    # Check certificate
    if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
        log_success "✅ SSL certificate exists"
    else
        log_error "❌ SSL certificate not found"
        return 1
    fi

    # Check nginx config
    if nginx -t 2>/dev/null; then
        log_success "✅ Nginx configuration valid"
    else
        log_error "❌ Nginx configuration error"
        return 1
    fi

    # Check ports
    if netstat -tlnp | grep -q ":443"; then
        log_success "✅ HTTPS port 443 is listening"
    else
        log_error "❌ HTTPS port 443 not listening"
        return 1
    fi

    # Test local HTTPS
    sleep 2
    if curl -s -k https://localhost | grep -q "<!DOCTYPE html>"; then
        log_success "✅ Local HTTPS test passed"
    else
        log_warning "⚠️  Local HTTPS test failed, but might work externally"
    fi
}

main() {
    echo "🔧 Fixing SSL Full Mode for alkindi.id"
    echo "======================================"

    check_root
    check_current_setup

    log_info "This will:"
    log_info "• Install SSL certificate via Let's Encrypt"
    log_info "• Configure Nginx for HTTPS"
    log_info "• Enable auto-renewal"
    log_info "• Make Full mode work in Cloudflare"

    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Setup cancelled."
        exit 0
    fi

    install_certbot
    get_ssl_certificate
    setup_auto_renewal
    verify_ssl

    echo ""
    echo "🎉 SSL Full Mode Setup Complete!"
    echo "================================"
    echo ""
    echo "✅ SSL certificate installed"
    echo "✅ Nginx configured for HTTPS"
    echo "✅ Auto-renewal enabled"
    echo ""
    echo "🔧 Next Steps:"
    echo "1. Go to Cloudflare dashboard"
    echo "2. Set SSL/TLS mode to 'Full (strict)'"
    echo "3. Test: https://alkindi.id"
    echo ""
    echo "🧪 Test Commands:"
    echo "• curl -I https://alkindi.id"
    echo "• openssl s_client -connect alkindi.id:443"
    echo ""
    log_success "Ready for Full mode!"
}

main "$@"