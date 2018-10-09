
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
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
  ],
}
