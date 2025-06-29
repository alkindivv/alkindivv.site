# Checklist Migrasi Domain alkind.id → alkind.id

## 📋 Persiapan Domain & DNS

- [ ] Domain alkind.id sudah terdaftar
- [ ] DNS A record: alkind.id → IP VPS
- [ ] DNS A record: www.alkind.id → IP VPS
- [ ] DNS CNAME record: www → alkind.id (alternatif)
- [ ] TTL DNS diset rendah (300s) untuk transisi cepat

## 🔧 Konfigurasi Server

- [ ] Backup konfigurasi nginx lama
- [ ] Backup database (jika ada)
- [ ] Backup direktori website lama
- [ ] Install SSL certificate untuk alkind.id
- [ ] Update konfigurasi nginx dengan redirect 301
- [ ] Test konfigurasi nginx: `nginx -t`
- [ ] Reload nginx: `systemctl reload nginx`

## 🚀 Deployment Aplikasi

- [ ] Clone/update repository di direktori baru
- [ ] Update next.config.js dengan domain baru
- [ ] Update environment variables
- [ ] Install dependencies: `npm ci`
- [ ] Build aplikasi: `npm run build`
- [ ] Setup PM2 untuk aplikasi baru
- [ ] Test aplikasi berjalan di domain baru

## 📝 Update Metadata & SEO

- [ ] Update NEXT_PUBLIC_BASE_URL di next.config.js ✅
- [ ] Update sitemap.xml dengan domain baru
- [ ] Update robots.txt dengan domain baru
- [ ] Update RSS/Atom feeds dengan domain baru
- [ ] Update Open Graph URLs
- [ ] Update structured data (JSON-LD)
- [ ] Update canonical URLs

## 🔗 Update Link Internal

- [ ] Search & replace internal links dalam content
- [ ] Update navigation menu links
- [ ] Update footer links
- [ ] Update social media links
- [ ] Update contact form action URLs

## 📊 Analytics & Tools

- [ ] Tambahkan property baru di Google Analytics
- [ ] Tambahkan domain baru di Google Search Console
- [ ] Update Google Tag Manager (jika digunakan)
- [ ] Update Facebook Pixel (jika digunakan)
- [ ] Update monitoring tools (Uptime Robot, dll)

## 🔐 Security & Performance

- [ ] Update CORS settings
- [ ] Update CSP headers dengan domain baru
- [ ] Update security.txt dengan domain baru
- [ ] Test SSL certificate
- [ ] Test security headers
- [ ] Test website performance

## 📢 Komunikasi & Marketing

- [ ] Update social media profiles
- [ ] Update email signatures
- [ ] Update business cards/marketing materials
- [ ] Inform regular visitors via newsletter
- [ ] Update backlinks (jika memungkinkan)

## 🧪 Testing

- [ ] Test semua halaman di domain baru
- [ ] Test form submissions
- [ ] Test API endpoints
- [ ] Test redirects dari domain lama
- [ ] Test mobile responsiveness
- [ ] Test loading speed

## 📈 Monitoring Post-Migration

- [ ] Monitor error logs: `tail -f /var/log/nginx/error.log`
- [ ] Monitor access logs untuk redirect
- [ ] Monitor Google Search Console untuk crawl errors
- [ ] Monitor analytics untuk traffic drop
- [ ] Monitor uptime

## ⏰ Timeline Migrasi

1. **Persiapan** (1-2 hari)

   - Setup DNS
   - Backup semua data
   - Persiapan konfigurasi

2. **Deployment** (2-4 jam)

   - Deploy aplikasi di domain baru
   - Setup redirects
   - Testing

3. **Post-Migration** (1-2 minggu)
   - Monitoring
   - Update tools & analytics
   - Komunikasi ke users

## 🚨 Rollback Plan

Jika terjadi masalah:

1. Restore nginx config lama
2. Point DNS kembali ke konfigurasi lama
3. Rollback PM2 aplikasi
4. Restore dari backup

## 📞 Support Contacts

- Domain registrar support
- VPS provider support
- DNS provider support
- SSL certificate provider
