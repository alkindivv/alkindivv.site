module.exports = {
  apps: [
    {
      name: 'alkindivv-site',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 9999,
        DATABASE_URL:
          'postgresql://postgres:YvJTiBtbUhGeDdfupTwPWzlPjaAKJoJC@autorack.proxy.rlwy.net:52070/railway',
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
    },
  ],
};
