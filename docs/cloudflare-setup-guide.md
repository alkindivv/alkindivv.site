# Panduan Setup CloudFlare untuk Domain Hostinger

## 1. Daftar CloudFlare (Gratis)

1. Buka https://cloudflare.com
2. Klik "Sign Up" dan daftar dengan email
3. Pilih plan "Free" (sudah cukup untuk website Anda)

## 2. Tambah Domain ke CloudFlare

1. Klik "Add a Site"
2. Masukkan domain Anda (contoh: alkind.id)
3. Pilih plan "Free"
4. CloudFlare akan scan DNS records existing

## 3. Update Nameserver di Hostinger

1. Login ke Hostinger control panel
2. Masuk ke "Domain" → pilih domain Anda
3. Klik "Manage" → "DNS/Nameservers"
4. Ganti nameserver ke CloudFlare:
   ```
   alma.ns.cloudflare.com
   rick.ns.cloudflare.com
   ```
   (Nameserver akan berbeda untuk setiap akun)

## 4. Konfigurasi DNS di CloudFlare

Tambahkan DNS records berikut:

### A Records:

```
Type: A
Name: @
Content: [IP_VPS_ANDA]
Proxy: ✅ Proxied (orange cloud)

Type: A
Name: www
Content: [IP_VPS_ANDA]
Proxy: ✅ Proxied (orange cloud)
```

### CNAME Records (Optional):

```
Type: CNAME
Name: blog
Content: alkind.id
Proxy: ✅ Proxied
```

## 5. Konfigurasi SSL/TLS

1. Masuk ke "SSL/TLS" tab
2. Pilih "Full (strict)" encryption mode
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

## 6. Optimasi Performance

### Speed Settings:

- Auto Minify: ✅ HTML, CSS, JavaScript
- Brotli: ✅ Enable
- Early Hints: ✅ Enable

### Caching:

- Browser Cache TTL: 1 year
- Caching Level: Standard
- Always Online: ✅ Enable

### Page Rules (Opsional):

```
Pattern: alkind.id/_next/static/*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 year
```

## 7. Verifikasi Setup

1. Tunggu 24-48 jam untuk propagasi DNS
2. Test di https://www.whatsmydns.net
3. Check SSL di https://www.ssllabs.com/ssltest/
4. Test speed di https://gtmetrix.com

## 8. Monitoring

- CloudFlare Analytics: Traffic, threats, performance
- Email notifications untuk downtime
- Security insights dan recommendations

## Tips Tambahan:

- Jangan proxy mail records (MX, TXT untuk email)
- Gunakan "Development Mode" saat testing
- Setup Page Rules untuk cache static assets
- Monitor Firewall Events untuk security threats
