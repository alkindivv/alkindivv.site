module.exports = {
  apps: [
    {
      name: 'alkindivv-site',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL:
          'postgresql://postgres:YvJTiBtbUhGeDdfupTwPWzlPjaAKJoJC@autorack.proxy.rlwy.net:52070/railway',
      },
    },
  ],
};
