const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias, } = require('customize-cra');
const AntdThemeConfig = require('./antd-theme-config.json');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: AntdThemeConfig,
  }),
  addWebpackAlias({
    '@api': path.resolve(__dirname, 'src/api'),
    '@app': path.resolve(__dirname, 'src/app'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@route': path.resolve(__dirname, 'src/route'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  })
);