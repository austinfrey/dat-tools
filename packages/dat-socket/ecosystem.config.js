module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'API',
      script    : 'bin.js',
      watch     : true,
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 3000
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
};
