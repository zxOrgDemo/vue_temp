const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // title: 'hellow',
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '渭南高新区雪亮工程大数据平台',
    },
  },
  devServer: {
    port: 3033,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api1': {
        target: 'http://192.168.3.15:9101/jeecg-boot',

        changeOrigin: true,
        pathRewrite: {
          '^/api1': '/'
        }
      },
    },
    //   before: require('./mock/mock-server.js')
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#285c95',
          'link-color': '#1890FF',
          'border-radius-base': '4px',
          'ant-btn-primary': '#2073cf',
        },
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 19.2,
            selectorBlackList: [],
            propList: ['*'],
          }),
        ],
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify('./') }),
      new CopyWebpackPlugin([ { from: path.resolve(__dirname,'node_modules/cesium/Source', '../Build/Cesium/Workers'), to: 'Workers' } ]),
      new CopyWebpackPlugin([ { from: path.resolve(__dirname,'node_modules/cesium/Source', 'Assets'), to: 'Assets' } ]),
      new CopyWebpackPlugin([ { from: path.resolve(__dirname,'node_modules/cesium/Source', 'Widgets'), to: 'Widgets' } ]),
      new CopyWebpackPlugin([ { from: path.resolve(__dirname,'node_modules/cesium/Source', 'ThirdParty/Workers'), to: 'ThirdParty/Workers' } ]),
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));

    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        echarts: 'echarts',
        // CESIUM_BASE_URL: JSON.stringify('')
      }
    ])
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
    }
  },
};
