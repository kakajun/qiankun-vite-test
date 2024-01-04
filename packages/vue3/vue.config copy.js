const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7305;

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
};
