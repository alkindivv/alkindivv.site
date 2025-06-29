# Panduan Setup Google Analytics 4 (GA4) - Lengkap

## 1. Buat Google Analytics Account

### Langkah-langkah

1. **Buka Google Analytics**: https://analytics.google.com/
2. **Klik "Start measuring"** atau "Mulai mengukur"
3. **Buat Account**:
   ```
   Account Name: AL KINDI Website
   Country: Indonesia
   Currency: Indonesian Rupiah (IDR)
   ```
4. **Centang semua data sharing options** (recommended)

### Property Setup

```
Property Name: alkind.id
Reporting Time Zone: (GMT+07:00) Jakarta
Currency: Indonesian Rupiah (IDR)
```

### Business Information

```
Industry Category: Professional Services
Business Size: Small (1-10 employees)
Usage: Generate leads, Get baseline reports
```

## 2. Setup Data Stream

### Web Data Stream

```
Website URL: https://alkind.id
Stream Name: alkind.id - Web
Enhanced Measurement: ✅ Enable (recommended)
```

### Enhanced Measurement Events

- ✅ Page views
- ✅ Scrolls (90% scroll depth)
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement
- ✅ File downloads

## 3. Dapatkan Measurement ID

Setelah setup, Anda akan mendapat **Measurement ID** seperti:

```
G-XXXXXXXXXX
```

**Simpan ID ini untuk Step 4!**

## 4. Konfigurasi Environment Variable

### Buat file .env.local

```bash
# Analytics & SEO
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"  # Ganti dengan ID Anda
NEXT_PUBLIC_BASE_URL="https://alkind.id"

# Google Search Console
GOOGLE_SITE_VERIFICATION="Wi4JqaZ0ymnKGeA5NvXPgr5c8LDUCd17vmFB3ZvtgNc"
```

### Restart Development Server

```bash
npm run dev
# atau
pnpm dev
```

## 5. Verifikasi Setup

### Test di Browser

1. Buka website: http://localhost:3000
2. Buka Developer Tools (F12)
3. Check Console untuk GA messages
4. Check Network tab untuk gtag requests

### Verifikasi Real-time

1. Buka Google Analytics
2. Masuk ke "Reports" → "Realtime"
3. Buka website Anda di tab baru
4. Lihat visitor muncul di GA real-time

## 6. Custom Events yang Sudah Tersedia

### Blog Reading Tracking

```javascript
// Otomatis track saat user baca blog post
trackBlogRead(
  'Judul Article',
  'law',
  5 // reading time in minutes
);
```

### Custom Event Tracking

```javascript
// Track button clicks, downloads, dll
trackEvent(
  'download_pdf', // action
  'resources', // category
  'legal-guide.pdf', // label
  1 // value
);
```

## 7. Enhanced Tracking Setup

### Scroll Tracking (Sudah Aktif)

- Otomatis track 90% scroll depth
- Berguna untuk engagement metrics

### Outbound Link Tracking (Sudah Aktif)

- Track clicks ke external websites
- Berguna untuk referral analysis

### File Download Tracking (Sudah Aktif)

- Track PDF, DOC, ZIP downloads
- Berguna untuk resource engagement

## 8. Goals & Conversions Setup

### Recommended Goals

```
1. Newsletter Signup
   - Event: email_signup
   - Category: engagement

2. Contact Form Submit
   - Event: contact_form_submit
   - Category: lead_generation

3. Blog Post Complete Read
   - Event: blog_read_complete
   - Category: content_engagement

4. Resource Download
   - Event: resource_download
   - Category: lead_generation
```

### Setup Conversions

1. GA4 → "Configure" → "Conversions"
2. Click "Create conversion event"
3. Add event names dari goals di atas

## 9. Audience & Demographics

### Enable Demographics

1. GA4 → "Configure" → "Data Settings"
2. Enable "Google Signals"
3. Enable "Demographics and Interests"

### Custom Audiences

```
1. Blog Readers
   - Condition: blog_read event
   - Duration: 30 days

2. Engaged Users
   - Condition: engagement_time_msec > 60000
   - Duration: 7 days

3. Potential Clients
   - Condition: contact_form_view OR email_signup
   - Duration: 90 days
```

## 10. E-commerce Tracking (Future)

Jika nanti ada paid content/services:

```javascript
// Track purchases
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 25.25,
  currency: 'IDR',
  items: [
    {
      item_id: 'legal-consultation',
      item_name: 'Legal Consultation',
      category: 'services',
      quantity: 1,
      price: 25.25,
    },
  ],
});
```

## 11. Privacy & GDPR Compliance

### Current Settings (Sudah Optimal)

```javascript
// Privacy-focused configuration
anonymize_ip: true,
allow_google_signals: false,
allow_ad_personalization_signals: false,
cookie_flags: 'SameSite=None;Secure'
```

### Cookie Consent (Opsional)

Jika butuh cookie banner, bisa tambahkan:

- CookieBot
- OneTrust
- Custom cookie consent

## 12. Reporting & Insights

### Key Metrics to Monitor

- **Users**: Total unique visitors
- **Sessions**: Total visits
- **Page Views**: Total page loads
- **Bounce Rate**: Single-page sessions
- **Session Duration**: Average time on site
- **Conversion Rate**: Goal completions

### Custom Reports

1. **Blog Performance**:

   - Metrics: Page views, time on page, scroll depth
   - Dimensions: Page title, category

2. **Traffic Sources**:

   - Metrics: Users, sessions, conversions
   - Dimensions: Source/medium, campaign

3. **Geographic Performance**:
   - Metrics: Users, engagement rate
   - Dimensions: Country, city

## 13. Integration dengan Tools Lain

### Google Search Console:

- Link GA4 dengan GSC untuk SEO insights
- Monitor organic search performance

### Google Ads (Future):

- Link untuk conversion tracking
- Audience remarketing

### Data Studio/Looker Studio:

- Create custom dashboards
- Automated reporting

## 14. Troubleshooting Common Issues

### GA4 Data Tidak Muncul:

- ✅ Check NEXT_PUBLIC_GA_ID di .env.local
- ✅ Restart development server
- ✅ Check browser console for errors
- ✅ Verify Measurement ID correct

### Real-time Data Kosong:

- ✅ Wait 24-48 hours untuk historical data
- ✅ Test dengan incognito/private browsing
- ✅ Check ad blockers disabled

### Events Tidak Tercatat:

- ✅ Verify event names match GA4 format
- ✅ Check custom event implementation
- ✅ Test events di GA4 DebugView

## 15. Best Practices

### Data Collection:

- Monitor data quality regularly
- Set up automated alerts
- Regular backup/export data
- Document all custom implementations

### Performance:

- GA4 script loads asynchronously
- Minimal impact on website speed
- Use gtag for consistency

### Compliance:

- Regular privacy policy updates
- Monitor cookie usage
- Respect user consent preferences
- Document data processing activities
