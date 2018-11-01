export default {
  runtimePublicPath: true,
  // publicPath: 'http://cdn.helloyzy.cn/images/',
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
