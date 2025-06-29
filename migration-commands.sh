#!/bin/bash

# Commands untuk Migrasi Domain di VPS
# Jalankan command ini satu per satu di VPS Anda

echo "🚀 Panduan Migrasi alkind.id → alkind.id"
echo "============================================="

echo ""
echo "1️⃣ BACKUP DATA LAMA"
echo "-------------------"
echo "sudo mkdir -p /var/backups/alkindi-migration-$(date +%Y%m%d)"
echo "sudo cp -r /var/www/alkind.id /var/backups/alkindi-migration-$(date +%Y%m%d)/"
echo "sudo cp -r /etc/nginx/sites-available /var/backups/alkindi-migration-$(date +%Y%m%d)/"
echo "sudo cp -r /etc/letsencrypt /var/backups/alkindi-migration-$(date +%Y%m%d)/"

echo ""
echo "2️⃣ SETUP DIREKTORI BARU"
echo "----------------------"
echo "sudo mkdir -p /var/www/alkind.id"
echo "cd /var/www/alkind.id"
echo "sudo git clone https://github.com/your-username/alkind.id.git ."
echo "sudo chown -R www-data:www-data /var/www/alkind.id"

echo ""
echo "3️⃣ INSTALL DEPENDENCIES & BUILD"
echo "-------------------------------"
echo "cd /var/www/alkind.id"
echo "npm ci --production"
echo "npm run build"

echo ""
echo "4️⃣ SETUP SSL CERTIFICATE"
echo "------------------------"
echo "sudo certbot certonly --nginx -d alkind.id -d www.alkind.id"

echo ""
echo "5️⃣ SETUP NGINX CONFIGURATION"
echo "----------------------------"
echo "# Copy file nginx-config-example.conf ke server"
echo "sudo cp nginx-config-example.conf /etc/nginx/sites-available/alkindi-migration"

echo "# Update path dalam konfigurasi"
echo "sudo sed -i 's|/path/to/your/nextjs/out|/var/www/alkind.id/out|g' /etc/nginx/sites-available/alkindi-migration"
echo "sudo sed -i 's|/path/to/alkind.id/|/etc/letsencrypt/live/alkind.id/|g' /etc/nginx/sites-available/alkindi-migration"
echo "sudo sed -i 's|/path/to/alkind.id/|/etc/letsencrypt/live/alkind.id/|g' /etc/nginx/sites-available/alkindi-migration"

echo "# Enable site"
echo "sudo ln -sf /etc/nginx/sites-available/alkindi-migration /etc/nginx/sites-enabled/"

echo "# Test dan reload nginx"
echo "sudo nginx -t"
echo "sudo systemctl reload nginx"

echo ""
echo "6️⃣ SETUP PM2 (jika menggunakan server-side)"
echo "-------------------------------------------"
echo "pm2 stop alkindivv-site 2>/dev/null || true"
echo "pm2 start npm --name alkind-id -- start"
echo "pm2 save"

echo ""
echo "7️⃣ TEST DEPLOYMENT"
echo "-----------------"
echo "curl -I https://alkind.id/"
echo "curl -I https://alkind.id/ # Should redirect to alkind.id"

echo ""
echo "8️⃣ MONITORING COMMANDS"
echo "--------------------"
echo "# Monitor nginx logs"
echo "sudo tail -f /var/log/nginx/access.log"
echo "sudo tail -f /var/log/nginx/error.log"

echo "# Monitor PM2"
echo "pm2 status"
echo "pm2 logs alkind-id"

echo "# Check SSL certificates"
echo "sudo certbot certificates"

echo ""
echo "9️⃣ CLEANUP (setelah migrasi berhasil)"
echo "-----------------------------------"
echo "# Disable old site (setelah yakin migrasi berhasil)"
echo "sudo rm /etc/nginx/sites-enabled/alkindivv-site"
echo "sudo systemctl reload nginx"

echo "# Stop old PM2 process"
echo "pm2 stop alkindivv-site"
echo "pm2 delete alkindivv-site"

echo ""
echo "🔟 TROUBLESHOOTING"
echo "-----------------"
echo "# Jika ada masalah, rollback:"
echo "sudo rm /etc/nginx/sites-enabled/alkindi-migration"
echo "sudo ln -sf /etc/nginx/sites-available/alkindivv-site /etc/nginx/sites-enabled/"
echo "sudo systemctl reload nginx"

echo ""
echo "📝 NOTES:"
echo "- Ganti 'your-username' dengan username GitHub Anda"
echo "- Pastikan DNS alkind.id sudah pointing ke IP VPS"
echo "- Monitor logs selama beberapa jam setelah migrasi"
echo "- Update Google Search Console dan Analytics"