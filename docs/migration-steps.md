# Checklist Migrasi Domain dengan CloudFlare

## ✅ Persiapan (Sudah Selesai)

- [x] DNS sudah dipindah ke CloudFlare
- [x] Domain alkind.id sudah terdaftar
- [x] Website code sudah update ke domain baru
- [x] Konfigurasi Nginx baru sudah siap

## 🚀 Langkah Deployment (Jalankan di VPS)

### 1. Upload File ke VPS

```bash
# Upload konfigurasi Nginx dan script
scp docs/nginx-alkind-new.conf root@YOUR_VPS_IP:/tmp/
scp docs/deploy-migration.sh root@YOUR_VPS_IP:/tmp/
```

### 2. Login ke VPS dan Jalankan Migrasi

```bash
ssh root@YOUR_VPS_IP

# Buat executable dan jalankan script
chmod +x /tmp/deploy-migration.sh
sudo bash /tmp/deploy-migration.sh
```

### 3. Manual Steps (Jika Script Gagal)

#### A. Setup SSL Certificate

```bash
# Install certbot jika belum ada
sudo apt update && sudo apt install certbot python3-certbot-nginx

# Buat certificate untuk domain baru
sudo certbot certonly --nginx -d alkind.id -d www.alkind.id
```

#### B. Setup Nginx Configuration

```bash
# Copy konfigurasi
sudo cp /tmp/nginx-alkind-new.conf /etc/nginx/sites-available/alkind.id

# Test konfigurasi
sudo nginx -t

# Enable site baru
sudo ln -sf /etc/nginx/sites-available/alkind.id /etc/nginx/sites-enabled/

# Disable site lama
sudo rm -f /etc/nginx/sites-enabled/alkindivv.site

# Reload Nginx
sudo systemctl reload nginx
```

#### C. Deploy Website

```bash
# Buat direktori project
sudo mkdir -p /var/www/alkind.id
cd /var/www/alkind.id

# Clone repository (ganti dengan URL Anda)
sudo git clone https://github.com/yourusername/alkindivv.site.git .

# Install dependencies
sudo npm ci

# Build aplikasi
sudo npm run build

# Setup environment variables
sudo tee .env.local << EOF
NEXT_PUBLIC_GA_ID="G-9SRV06N84B"
NEXT_PUBLIC_BASE_URL="https://alkind.id"
GOOGLE_SITE_VERIFICATION="Wi4JqaZ0ymnKGeA5NvXPgr5c8LDUCd17vmFB3ZvtgNc"
NODE_ENV=production
EOF
```

#### D. Setup PM2

```bash
# Stop aplikasi lama
pm2 stop alkindivv-site 2>/dev/null || true

# Setup PM2 config
sudo tee ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'alkind-site',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/alkind.id',
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

# Start aplikasi baru
pm2 start ecosystem.config.js
pm2 save
```

## 🧪 Testing & Verifikasi

### 1. Test Aplikasi Local

```bash
# Test aplikasi di server
curl -I http://localhost:9999

# Check PM2 status
pm2 status
pm2 logs alkind-site
```

### 2. Test Domain

```bash
# Test domain baru
curl -I https://alkind.id

# Test redirect dari domain lama
curl -I https://alkindivv.site
```

### 3. Test CloudFlare

```bash
# Check CloudFlare headers
curl -I https://alkind.id | grep -i cf-

# Test dari berbagai lokasi
# https://www.whatsmydns.net/#A/alkind.id
```

## 📊 Monitoring Post-Migration

### 1. Monitor Logs

```bash
# Nginx logs
sudo tail -f /var/log/nginx/alkind.id.access.log
sudo tail -f /var/log/nginx/alkind.id.error.log

# PM2 logs
pm2 logs alkind-site

# System logs
sudo journalctl -u nginx -f
```

### 2. Monitor Performance

```bash
# Check server resources
htop
df -h
free -h

# Check website performance
# https://gtmetrix.com/
# https://pagespeed.web.dev/
```

### 3. Monitor Analytics

- Google Analytics: Real-time data
- CloudFlare Analytics: Traffic & performance
- Google Search Console: SEO impact

## 🔧 Troubleshooting

### SSL Certificate Issues

```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates

# Test SSL
openssl s_client -connect alkind.id:443 -servername alkind.id
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx
```

### PM2 Issues

```bash
# Restart application
pm2 restart alkind-site

# Check logs
pm2 logs alkind-site --lines 100

# Reload PM2
pm2 reload alkind-site
```

### CloudFlare Issues

```bash
# Purge CloudFlare cache
# Dashboard → Caching → Purge Everything

# Check DNS propagation
dig alkind.id
nslookup alkind.id
```

## 📋 Post-Migration Checklist

### Immediate (24 hours)

- [ ] Website accessible at https://alkind.id
- [ ] Redirects working: alkindivv.site → alkind.id
- [ ] SSL certificate valid (A+ rating)
- [ ] Google Analytics tracking working
- [ ] All pages loading correctly
- [ ] Contact form working
- [ ] RSS feeds accessible

### Week 1

- [ ] Google Search Console updated
- [ ] Update social media profiles
- [ ] Update email signatures
- [ ] Monitor error logs
- [ ] Check for broken links
- [ ] Monitor search rankings

### Week 2-4

- [ ] Monitor traffic patterns
- [ ] Check Google Analytics data
- [ ] Update backlinks (if possible)
- [ ] Monitor Core Web Vitals
- [ ] Cleanup old configurations

## 🆘 Rollback Plan

Jika ada masalah serius:

```bash
# 1. Restore Nginx config lama
sudo ln -sf /etc/nginx/sites-available/alkindivv.site /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/alkind.id
sudo systemctl reload nginx

# 2. Start aplikasi lama
pm2 start alkindivv-site

# 3. Point DNS kembali (di CloudFlare dashboard)
# Ubah A record alkind.id ke maintenance page
# Restore A record alkindivv.site ke server IP
```

## 📞 Support Resources

- **CloudFlare Support**: https://support.cloudflare.com/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **PM2 Documentation**: https://pm2.keymetrics.io/docs/
