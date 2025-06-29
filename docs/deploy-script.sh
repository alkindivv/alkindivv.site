#!/bin/bash

# Script Deployment untuk alkind.id
# Pastikan script ini dijalankan dengan sudo privileges untuk nginx

set -e  # Exit on any error

# Konfigurasi
DOMAIN_NEW="alkind.id"
DOMAIN_OLD="alkind.id"
PROJECT_DIR="/var/www/alkind.id"
NGINX_CONFIG="/etc/nginx/sites-available/alkindi-migration"
PM2_APP_NAME="alkind-id"
BACKUP_DIR="/var/backups/alkindi-$(date +%Y%m%d-%H%M%S)"

echo "🚀 Memulai deployment alkind.id..."

# 1. Backup konfigurasi lama
echo "📦 Membuat backup..."
mkdir -p $BACKUP_DIR
cp -r /var/www/alkind.id $BACKUP_DIR/ 2>/dev/null || true
cp /etc/nginx/sites-available/* $BACKUP_DIR/ 2>/dev/null || true

# 2. Clone atau update repository
echo "📥 Mengupdate kode..."
if [ -d "$PROJECT_DIR" ]; then
    cd $PROJECT_DIR
    git pull origin main
else
    git clone https://github.com/username/alkind.id.git $PROJECT_DIR
    cd $PROJECT_DIR
fi

# 3. Install dependencies dan build
echo "🔧 Installing dependencies..."
npm ci --production

echo "🏗️  Building aplikasi..."
npm run build

# 4. Setup SSL Certificate untuk domain baru
echo "🔒 Setting up SSL certificate..."
if command -v certbot &> /dev/null; then
    certbot certonly --nginx -d $DOMAIN_NEW -d www.$DOMAIN_NEW --non-interactive --agree-tos --email your-email@example.com
else
    echo "⚠️  Certbot tidak ditemukan. Install SSL certificate secara manual."
fi

# 5. Copy nginx configuration
echo "🌐 Configuring Nginx..."
cp docs/nginx-config-alkind.conf $NGINX_CONFIG

# Enable site
ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 6. Setup PM2 untuk domain baru (jika menggunakan server-side features)
echo "🔄 Setting up PM2..."
if command -v pm2 &> /dev/null; then
    # Stop aplikasi lama jika ada
    pm2 stop $PM2_APP_NAME 2>/dev/null || true
    pm2 delete $PM2_APP_NAME 2>/dev/null || true

    # Start aplikasi baru
    pm2 start npm --name $PM2_APP_NAME -- start
    pm2 save
    pm2 startup
fi

# 7. Update permissions
echo "🔑 Setting permissions..."
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR

# 8. Clear caches
echo "🧹 Clearing caches..."
if command -v redis-cli &> /dev/null; then
    redis-cli FLUSHALL
fi

# 9. Test deployment
echo "🧪 Testing deployment..."
curl -I https://$DOMAIN_NEW/ || echo "⚠️  Website belum dapat diakses"

echo "✅ Deployment selesai!"
echo "📋 Ringkasan:"
echo "   - Domain baru: https://$DOMAIN_NEW"
echo "   - Redirect otomatis dari: https://$DOMAIN_OLD"
echo "   - Backup tersimpan di: $BACKUP_DIR"
echo "   - Log nginx: tail -f /var/log/nginx/error.log"
echo "   - PM2 status: pm2 status"

echo ""
echo "🔍 Langkah selanjutnya:"
echo "1. Test semua halaman di domain baru"
echo "2. Update Google Search Console"
echo "3. Update Google Analytics"
echo "4. Update social media links"
echo "5. Inform users tentang domain baru"