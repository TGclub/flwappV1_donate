export default {
  // runtimePublicPath: true,
  // publicPath: 'http://cdn.helloyzy.cn/images/',
  disableCSSModules: true,
  exportStatic: {
    htmlSuffix: true,
  },
  routes: [{
      path: '/poster',
      component: './poster'
    },
    {
      path: '/donate',
      component: './donate'
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
    // 屏幕自适应
    ['./src/plugins/vw/index.js', {}],
    // 编译后hook
    ['./src/plugins/onBuildSuccess/index.js', {}],
    // 注入wxBridge
    ['./src/plugins/wxJSBridge.js', {}],
  ],
}
