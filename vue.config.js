
const path = require('path');

module.exports = {
  lintOnSave: false,
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: false,

  devServer: {
    port: '3003',
    open: false,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://172.20.11.193:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  pluginOptions: {
    
  },
};
