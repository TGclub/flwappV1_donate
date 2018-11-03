export default {
  // runtimePublicPath: true,
  // publicPath: 'http://cdn.helloyzy.cn/images/',
  disableCSSModules: true,
  routes: [{
      path: '/poster',
      component: './poster/poster.js'
    },
    {
      path: '/donate',
      component: './donate/donate.js'
    }
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: '捐赠小红花',
      dll: false,
      pwa: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
    ['./src/plugins/vw/index.js', {}]
  ],
}
