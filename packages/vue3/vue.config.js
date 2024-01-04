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
    allowedHosts:'all',
    // 升级到webpack5后，会有变化， 详情http://www.manongjc.com/detail/42-dhqszxnagmkqnzp.html
    historyApiFallback: {
      index: 'http://localhost:7305/index.html' // xxx为路径，和打包output配置有关
    },
    client:{
      overlay: {
        warnings: false,
        errors: true,
      },
    },
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
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
};
