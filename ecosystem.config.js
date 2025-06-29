module.exports = {
  apps: [
    {
      name: 'alkind-id-site',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 9999,
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
    },
  ],
};
