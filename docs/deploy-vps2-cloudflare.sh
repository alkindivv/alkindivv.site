#!/bin/bash

# Script Deployment VPS Kedua - alkind.id dengan CloudFlare SSL
# Jalankan dengan: sudo bash deploy-vps2-cloudflare.sh

set -e  # Exit on any error

echo "🚀 Deployment Website Baru di VPS Kedua dengan CloudFlare SSL"
echo "============================================================="

# Variabel konfigurasi
NEW_DOMAIN="alkind.id"
PROJECT_DIR="/var/www/alkind.id"
PM2_APP_NEW="alkind-site"

# Fungsi untuk log dengan timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Fungsi untuk error handling
error_exit() {
    log "ERROR: $1"
    exit 1
}

# 1. Update sistem
log "📦 Update sistem..."
apt update && apt upgrade -y

# 2. Install dependencies
log "📦 Install dependencies..."
apt install -y nginx nodejs npm git curl

# 3. Install PM2
log "📦 Install PM2..."
npm install -g pm2

# 4. Setup direktori project
log "📁 Setup direktori project..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# 5. Clone/setup repository
log "📥 Clone repository..."
if [ -d ".git" ]; then
    log "Repository sudah ada, melakukan git pull..."
    git pull origin main || git pull origin master
else
    log "Clone repository baru..."
    # Ganti dengan URL repository Anda
    git clone https://github.com/yourusername/alkindivv.site.git .
fi

# 6. Install dependencies dan build
log "📦 Install dependencies..."
npm ci --production=false

log "🏗️  Build aplikasi..."
npm run build

# 7. Setup environment variables
log "⚙️  Setup environment variables..."
cat > .env.local << EOF
# Analytics & SEO
NEXT_PUBLIC_GA_ID="G-9SRV06N84B"
NEXT_PUBLIC_BASE_URL="https://alkind.id"

# Google Search Console
GOOGLE_SITE_VERIFICATION="Wi4JqaZ0ymnKGeA5NvXPgr5c8LDUCd17vmFB3ZvtgNc"

# Production settings
NODE_ENV=production
EOF

# 8. Generate self-signed SSL certificate untuk CloudFlare Full mode
log "🔐 Generate self-signed SSL certificate..."
mkdir -p /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/alkind.id.key \
    -out /etc/nginx/ssl/alkind.id.crt \
    -subj "/C=ID/ST=Jakarta/L=Jakarta/O=AL KINDI/OU=IT Department/CN=alkind.id"

# 9. Setup konfigurasi Nginx
log "🌐 Setup konfigurasi Nginx..."
cp docs/nginx-alkind-cloudflare-only.conf /etc/nginx/sites-available/$NEW_DOMAIN

# 10. Test konfigurasi Nginx
log "🧪 Test konfigurasi Nginx..."
nginx -t || error_exit "Konfigurasi Nginx tidak valid"

# 11. Enable site baru
log "🔄 Enable site baru..."
ln -sf /etc/nginx/sites-available/$NEW_DOMAIN /etc/nginx/sites-enabled/

# 12. Remove default site
rm -f /etc/nginx/sites-enabled/default

# 13. Reload Nginx
log "🔄 Reload Nginx..."
systemctl reload nginx

# 14. Setup PM2 untuk aplikasi
log "🚀 Setup PM2 aplikasi..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$PM2_APP_NEW',
    script: 'npm',
    args: 'start',
    cwd: '$PROJECT_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 9999
    }
  }]
};
EOF

# 15. Start aplikasi
log "▶️  Start aplikasi..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 16. Setup firewall
log "🔥 Setup firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# 17. Test aplikasi
log "🧪 Test aplikasi..."
sleep 5
if curl -f -s http://localhost:9999 > /dev/null; then
    log "✅ Aplikasi berjalan dengan baik"
else
    error_exit "Aplikasi tidak dapat diakses di localhost:9999"
fi

# 18. Test Nginx
log "🧪 Test Nginx..."
if curl -f -s -I http://localhost > /dev/null; then
    log "✅ Nginx berjalan dengan baik"
else
    error_exit "Nginx tidak dapat diakses"
fi

echo ""
echo "🎉 DEPLOYMENT SELESAI!"
echo "======================"
echo "✅ Domain: https://$NEW_DOMAIN (via CloudFlare)"
echo "✅ PM2 app: $PM2_APP_NEW"
echo "✅ Project dir: $PROJECT_DIR"
echo "✅ SSL: Self-signed untuk CloudFlare Full mode"
echo ""
echo "📋 Langkah selanjutnya:"
echo "1. Update DNS A record di CloudFlare: alkind.id → IP_VPS_KEDUA"
echo "2. Set CloudFlare SSL mode ke 'Full'"
echo "3. Test website: https://$NEW_DOMAIN"
echo "4. Monitor logs: pm2 logs $PM2_APP_NEW"
echo ""
echo "🔧 Commands berguna:"
echo "- pm2 restart $PM2_APP_NEW"
echo "- pm2 logs $PM2_APP_NEW"
echo "- nginx -t && systemctl reload nginx"
echo "- systemctl status nginx"
echo ""
echo "📊 CloudFlare Settings:"
echo "- SSL/TLS Mode: Full"
echo "- Always Use HTTPS: On"
echo "- Auto Minify: HTML, CSS, JS"
echo "- Brotli: On"