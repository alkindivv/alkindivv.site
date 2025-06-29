#!/bin/bash

# Script Migrasi Domain alkindivv.site → alkind.id
# Jalankan dengan: sudo bash deploy-migration.sh

set -e  # Exit on any error

echo "🚀 Memulai Migrasi Domain alkindivv.site → alkind.id"
echo "================================================="

# Variabel konfigurasi
OLD_DOMAIN="alkindivv.site"
NEW_DOMAIN="alkind.id"
PROJECT_DIR="/var/www/alkind.id"
BACKUP_DIR="/var/backups/migration-$(date +%Y%m%d-%H%M%S)"
PM2_APP_OLD="alkindivv-site"
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

# 1. Backup konfigurasi lama
log "📦 Membuat backup konfigurasi lama..."
mkdir -p $BACKUP_DIR
cp -r /etc/nginx/sites-available/$OLD_DOMAIN $BACKUP_DIR/ 2>/dev/null || true
cp -r /var/www/alkindivv.site $BACKUP_DIR/ 2>/dev/null || true
log "✅ Backup selesai di: $BACKUP_DIR"

# 2. Stop aplikasi lama
log "⏹️  Menghentikan aplikasi lama..."
pm2 stop $PM2_APP_OLD 2>/dev/null || log "⚠️  PM2 app $PM2_APP_OLD tidak ditemukan"

# 3. Setup direktori project baru
log "📁 Setup direktori project baru..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# 4. Clone/update repository
log "📥 Clone repository..."
if [ -d ".git" ]; then
    log "Repository sudah ada, melakukan git pull..."
    git pull origin main || git pull origin master
else
    log "Clone repository baru..."
    # Ganti dengan URL repository Anda
    git clone https://github.com/yourusername/alkindivv.site.git .
fi

# 5. Install dependencies dan build
log "📦 Install dependencies..."
npm ci --production=false

log "🏗️  Build aplikasi..."
npm run build

# 6. Setup environment variables
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

# 7. Setup SSL certificate untuk domain baru
log "🔐 Setup SSL certificate untuk $NEW_DOMAIN..."
if [ ! -f "/etc/letsencrypt/live/$NEW_DOMAIN/fullchain.pem" ]; then
    log "Membuat SSL certificate baru..."
    certbot certonly --nginx -d $NEW_DOMAIN -d www.$NEW_DOMAIN --non-interactive --agree-tos --email admin@$NEW_DOMAIN
else
    log "✅ SSL certificate sudah ada"
fi

# 8. Setup konfigurasi Nginx baru
log "🌐 Setup konfigurasi Nginx..."
cp docs/nginx-alkind-new.conf /etc/nginx/sites-available/$NEW_DOMAIN

# 9. Test konfigurasi Nginx
log "🧪 Test konfigurasi Nginx..."
nginx -t || error_exit "Konfigurasi Nginx tidak valid"

# 10. Enable site baru dan disable site lama
log "🔄 Enable site baru..."
ln -sf /etc/nginx/sites-available/$NEW_DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/$OLD_DOMAIN

# 11. Reload Nginx
log "🔄 Reload Nginx..."
systemctl reload nginx

# 12. Setup PM2 untuk aplikasi baru
log "🚀 Setup PM2 aplikasi baru..."
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

# 13. Start aplikasi baru
log "▶️  Start aplikasi baru..."
pm2 start ecosystem.config.js
pm2 save

# 14. Test aplikasi
log "🧪 Test aplikasi..."
sleep 5
if curl -f -s http://localhost:9999 > /dev/null; then
    log "✅ Aplikasi berjalan dengan baik"
else
    error_exit "Aplikasi tidak dapat diakses di localhost:9999"
fi

# 15. Test domain
log "🧪 Test domain baru..."
if curl -f -s -I https://$NEW_DOMAIN > /dev/null; then
    log "✅ Domain $NEW_DOMAIN dapat diakses"
else
    log "⚠️  Domain $NEW_DOMAIN belum dapat diakses (mungkin DNS belum propagasi)"
fi

# 16. Cleanup (opsional)
log "🧹 Cleanup..."
pm2 delete $PM2_APP_OLD 2>/dev/null || log "⚠️  PM2 app $PM2_APP_OLD sudah tidak ada"

echo ""
echo "🎉 MIGRASI SELESAI!"
echo "==================="
echo "✅ Domain baru: https://$NEW_DOMAIN"
echo "✅ PM2 app: $PM2_APP_NEW"
echo "✅ Project dir: $PROJECT_DIR"
echo "✅ Backup: $BACKUP_DIR"
echo ""
echo "📋 Langkah selanjutnya:"
echo "1. Test website: https://$NEW_DOMAIN"
echo "2. Test redirect: https://$OLD_DOMAIN → https://$NEW_DOMAIN"
echo "3. Monitor logs: pm2 logs $PM2_APP_NEW"
echo "4. Monitor Nginx: tail -f /var/log/nginx/alkind.id.error.log"
echo ""
echo "🔧 Commands berguna:"
echo "- pm2 restart $PM2_APP_NEW"
echo "- pm2 logs $PM2_APP_NEW"
echo "- nginx -t && systemctl reload nginx"
echo "- certbot renew --dry-run"