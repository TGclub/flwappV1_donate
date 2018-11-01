const path = require('path')
export default (api, opts) => {
  api.chainWebpackConfig((webpack) => {
    webpack.entry('vw').add(path.resolve(__dirname, './lib/vw.js'))
  });

  api.addHTMLScript({
    src: 'vw.js',
  });
}
