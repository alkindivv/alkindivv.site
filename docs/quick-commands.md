# 🚀 Quick Commands Reference - alkindi.id

Kumpulan command penting untuk maintenance dan troubleshooting website alkindi.id.

## 📋 Status Checking

```bash
# Check PM2 status
pm2 status
pm2 list

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check application logs
pm2 logs alkindi-id
pm2 logs --lines 50

# Check Nginx logs
sudo tail -f /var/log/nginx/alkindi.id.access.log
sudo tail -f /var/log/nginx/alkindi.id.error.log
sudo tail -f /var/log/nginx/error.log

# Check system resources
htop
df -h
free -h
```

## 🔄 Restart Services

```bash
# Restart Next.js app
pm2 restart alkindi-id
pm2 restart all

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl reload nginx

# Restart both
pm2 restart alkindi-id && sudo systemctl reload nginx
```

## 🔧 Deployment & Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild application
npm run build

# Restart with new build
pm2 restart alkindi-id

# One-liner deployment
git pull && npm install && npm run build && pm2 restart alkindi-id
```

## 🐛 Troubleshooting

### Error 522 (Connection Timeout)

```bash
# Check if app is running
curl http://localhost:9999
pm2 status

# Check nginx config
sudo nginx -t
sudo systemctl status nginx

# Check DNS
nslookup alkindi.id
dig alkindi.id
```

### Default Nginx Page

```bash
# Remove conflicting configs
sudo rm -f /etc/nginx/sites-enabled/default
sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
sudo systemctl reload nginx
```

### High Memory Usage

```bash
# Check memory usage
pm2 monit
free -h

# Restart app to clear memory
pm2 restart alkindi-id

# Check for memory leaks
pm2 logs alkindi-id | grep -i "memory\|heap"
```

### SSL Issues

```bash
# Check SSL certificate (Cloudflare)
openssl s_client -connect alkindi.id:443 -servername alkindi.id

# Verify Cloudflare settings
# - SSL mode: Flexible
# - Always Use HTTPS: On
```

## 📊 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Check disk space
df -h
du -sh /var/log/*

# Check network connections
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :9999

# Check firewall status
sudo ufw status
sudo fail2ban-client status
```

## 🔒 Security

```bash
# Check fail2ban status
sudo fail2ban-client status
sudo fail2ban-client status sshd

# Check UFW firewall
sudo ufw status verbose

# View auth logs
sudo tail -f /var/log/auth.log

# Check for suspicious activity
sudo grep "Failed password" /var/log/auth.log | tail -10
```

## 📁 File Locations

```bash
# Configuration files
/etc/nginx/sites-available/alkindi.id    # Nginx config
/etc/nginx/nginx.conf                    # Main nginx config
$(pwd)/ecosystem.config.js               # PM2 config
$(pwd)/.env.local                        # Environment variables

# Log files
/var/log/nginx/alkindi.id.access.log     # Nginx access logs
/var/log/nginx/alkindi.id.error.log      # Nginx error logs
/var/log/pm2/                            # PM2 logs directory

# Application
$(pwd)/.next/                            # Next.js build directory
$(pwd)/node_modules/                     # Dependencies
```

## 🚀 Performance Optimization

```bash
# Clear PM2 logs
pm2 flush

# Optimize Next.js build
npm run build

# Clear npm cache
npm cache clean --force

# Update dependencies
npm update
npm audit fix

# Restart with optimized settings
pm2 restart alkindi-id --max-memory-restart 1G
```

## 📈 Analytics & Metrics

```bash
# Check access logs for traffic
sudo tail -100 /var/log/nginx/alkindi.id.access.log | grep -v bot

# Count unique visitors today
sudo grep "$(date +%d/%b/%Y)" /var/log/nginx/alkindi.id.access.log | awk '{print $1}' | sort | uniq | wc -l

# Most accessed pages
sudo awk '{print $7}' /var/log/nginx/alkindi.id.access.log | sort | uniq -c | sort -nr | head -10

# Response codes
sudo awk '{print $9}' /var/log/nginx/alkindi.id.access.log | sort | uniq -c | sort -nr
```

## 🔄 Backup & Recovery

```bash
# Backup configuration
sudo cp -r /etc/nginx/sites-available/ ~/nginx-backup-$(date +%Y%m%d)
cp ecosystem.config.js ~/ecosystem-backup-$(date +%Y%m%d).js

# Backup environment
cp .env.local ~/env-backup-$(date +%Y%m%d).local

# Create full backup
tar -czf ~/alkindi-backup-$(date +%Y%m%d).tar.gz \
  /etc/nginx/sites-available/alkindi.id \
  ecosystem.config.js \
  .env.local \
  package.json \
  package-lock.json
```

## 📞 Emergency Commands

```bash
# Stop everything
pm2 stop all
sudo systemctl stop nginx

# Start everything
sudo systemctl start nginx
pm2 start ecosystem.config.js

# Force restart everything
pm2 kill
sudo systemctl restart nginx
pm2 start ecosystem.config.js
pm2 save

# Reset to working state
git checkout main
git pull
npm install
npm run build
pm2 restart alkindi-id
sudo systemctl reload nginx
```

---

_Quick reference untuk maintenance alkindi.id_
_Selalu backup sebelum melakukan perubahan!_
