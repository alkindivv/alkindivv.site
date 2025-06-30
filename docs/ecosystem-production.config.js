// 🚀 PM2 Ecosystem Configuration for alkindi.id
// Production-ready configuration for Next.js application
//
// Usage:
// pm2 start docs/ecosystem-production.config.js
// pm2 save
// pm2 startup

module.exports = {
  apps: [
    {
      name: 'alkindi-id',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/root/alkindivv.site', // Update this path
      instances: 'max', // Use all CPU cores
      exec_mode: 'cluster',

      // Environment
      env: {
        NODE_ENV: 'production',
        PORT: 9999,
        NEXT_PUBLIC_BASE_URL: 'https://alkindi.id',
        NEXT_PUBLIC_SITE_URL: 'https://alkindi.id',
      },

      // Logging
      log_file: '/root/log/pm2/alkindi-id.log',
      out_file: '/root/log/pm2/alkindi-id-out.log',
      error_file: '/root/log/pm2/alkindi-id-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Performance
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',

      // Restart policy
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',

      // Health monitoring
      kill_timeout: 5000,
      listen_timeout: 3000,

      // Auto restart on file changes (disable in production)
      watch: false,

      // Cron restart (optional - restart every day at 3 AM)
      cron_restart: '0 3 * * *',

      // Merge logs
      merge_logs: true,

      // Time zone
      time: true,

      // Advanced settings
      interpreter: 'node',
      interpreter_args: '--harmony',

      // Source map support
      source_map_support: true,

      // Disable auto restart on crash after 10 times
      autorestart: true,

      // Environment variables for different stages
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
      },

      env_production: {
        NODE_ENV: 'production',
        PORT: 9999,
        NEXT_PUBLIC_BASE_URL: 'https://alkindi.id',
        NEXT_PUBLIC_SITE_URL: 'https://alkindi.id',
      },
    },
  ],

  // Deployment configuration (optional)
  deploy: {
    production: {
      user: 'root',
      host: '88.222.214.114', // Update this
      ref: 'V4-New-Domain',
      repo: 'https://github.com/alkindi/alkindivv.site.git', // Update this
      path: '/root/alkindivv.site',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
