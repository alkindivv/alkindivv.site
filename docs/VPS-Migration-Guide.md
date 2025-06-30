# 🚀 Panduan Migrasi VPS - alkindi.id

Dokumentasi lengkap untuk setup dan migrasi website alkindi.id ke VPS baru.

## 📋 Prerequisites

- Ubuntu/Debian VPS dengan akses root
- Domain alkindi.id sudah pointing ke IP VPS
- Cloudflare account dengan domain terdaftar
- Node.js 18+ dan PM2 untuk menjalankan Next.js

## 🔧 Quick Setup

Jalankan script otomatis:

```bash
chmod +x docs/vps-setup-complete.sh
sudo ./docs/vps-setup-complete.sh
```

## 📖 Manual Setup Steps

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Git
sudo apt install git -y
```

### 2. Clone dan Setup Project

```bash
# Clone repository
git clone https://github.com/username/alkindivv.site.git
cd alkindivv.site

# Install dependencies
npm install

# Build project
npm run build

# Setup PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Configure Nginx

```bash
# Copy konfigurasi nginx
sudo cp docs/nginx-alkindi-production.conf /etc/nginx/sites-available/alkindi.id

# Enable site
sudo ln -sf /etc/nginx/sites-available/alkindi.id /etc/nginx/sites-enabled/alkindi.id

# Disable default configurations
sudo rm -f /etc/nginx/sites-enabled/default
sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled 2>/dev/null || true

# Add sites-enabled include to nginx.conf
sudo sed -i '/http {/a\\t# Include sites-enabled\n\tinclude /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf

# Test dan restart
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Configure Cloudflare

- Set DNS A record: alkindi.id → VPS_IP
- SSL/TLS mode: **Flexible**
- Always Use HTTPS: **On**

## 🔍 Troubleshooting

### Error 522 (Connection Timeout)

```bash
# Check if Next.js running
pm2 status
curl http://localhost:9999

# Check nginx
sudo systemctl status nginx
sudo nginx -t

# Check DNS
nslookup alkindi.id
```

### Default Nginx Page

```bash
# Remove conflicting configs
sudo rm -f /etc/nginx/sites-enabled/default
sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
sudo systemctl reload nginx
```

### SSL Issues

- Pastikan Cloudflare SSL mode: **Flexible**
- Jangan install SSL certificate di VPS (Cloudflare handles it)

## 📁 File Structure

```
docs/
├── VPS-Migration-Guide.md          # Dokumentasi ini
├── vps-setup-complete.sh           # Script setup otomatis
├── nginx-alkindi-production.conf   # Konfigurasi Nginx production
└── ecosystem-production.config.js  # PM2 configuration
```

## 🌐 Environment Variables

Buat file `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=https://alkindi.id
NEXT_PUBLIC_SITE_URL=https://alkindi.id
# Tambahkan env lainnya sesuai kebutuhan
```

## 🔄 Update Process

```bash
# Pull latest changes
git pull origin main

# Rebuild
npm run build

# Restart PM2
pm2 restart all
```

## ✅ Verification Checklist

- [ ] Next.js app running on port 9999
- [ ] PM2 status shows app running
- [ ] Nginx config valid (`sudo nginx -t`)
- [ ] No default nginx page
- [ ] HTTPS working via Cloudflare
- [ ] All pages accessible
- [ ] RSS/Sitemap working

## 📞 Support

Jika ada masalah, check:

1. PM2 logs: `pm2 logs`
2. Nginx logs: `sudo tail -f /var/log/nginx/alkindi.id.error.log`
3. System logs: `sudo journalctl -u nginx`

---

_Generated: $(date)_
_VPS IP: $(curl -s ifconfig.me)_
