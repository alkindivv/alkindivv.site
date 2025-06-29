# DNS Records Tambahan untuk Optimasi

## Records yang Direkomendasikan Ditambahkan:

### 1. DMARC Record (Email Security)

```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=quarantine; rua=mailto:dmarc@alkind.id; ruf=mailto:dmarc@alkind.id; fo=1
Proxy: DNS only (gray cloud)
```

### 2. WWW Redirect (Jika Diperlukan)

```
Type: CNAME
Name: www
Content: alkind.id
Proxy: Proxied (orange cloud)
```

### 3. Webmail Access (Opsional)

```
Type: CNAME
Name: mail
Content: business.zoho.com
Proxy: Proxied (orange cloud)
```

### 4. Subdomain untuk Development (Opsional)

```
Type: A
Name: dev
Content: [IP_VPS_ANDA]
Proxy: DNS only (gray cloud)
```

## Records yang TIDAK Perlu Ditambah:

- ✅ MX Records sudah lengkap
- ✅ SPF Record sudah benar
- ✅ DKIM Record sudah ada
- ✅ CAA Records sudah comprehensive
- ✅ A Record untuk website sudah ada

## Verifikasi Setelah Aktivasi:

1. Test email: kirim/terima email
2. Test website: akses alkind.id
3. Test SSL: https://www.ssllabs.com/ssltest/
4. Test DNS: https://www.whatsmydns.net/
5. Test speed: https://gtmetrix.com/
