import './index.less';
import React from 'react';
import html2canvas from 'html2canvas';
import qs from 'qs';
export default class Poster extends React.Component {
  getQueryString = (name) => {
    const paramObj = qs.parse(window.location.search.replace(/\?/,''));
    return paramObj[name] ? paramObj[name] : null
  }
  componentDidMount() {
    const donateName = this.getQueryString('name');
    console.log(donateName)
    if (!donateName) {
      alert('捐赠信息校验失败！')
      window.close();
    }
    this.setState({
      name: donateName
    }, ()=>{
      setTimeout(() => {
        this.convertCanvasToImage('#target', html2canvas, (canvas) => {
          this.setState({
            isFinish: true,
            url: canvas.toDataURL(),
          })
        });
      }, 0)
    });
  }
  constructor() {
    super();
    this.state = {
      name: '',
      year: '',
      month: '',
      day: '',
      isFinish: false,
      url: '',
    }
  }

  /**
   * 通过canvas生成图片
   * @param dom dom节点的id
   * @param html2Canvas 库
   * @param cb 回调函数
   */
  convertCanvasToImage (dom, html2Canvas, cb) {
    const captureContent = document.querySelector(dom);
      const width = captureContent.offsetWidth;
      const height = captureContent.offsetHeight;
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.height = height * scale;
      canvas.width  =  width * scale;
      console.log(canvas.height, canvas.width);
      const opts = {
        scale: scale,
        canvas: canvas,
        width: width,
        height: height,
        useCORS: true,
      }
      html2Canvas(captureContent, opts).then(canvas => {
        const context = canvas.getContext('2d');
        context.font = "serif";
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        cb(canvas);
      });
  }

  render() {
    const {isFinish, name, year, month, day, url} = this.state
    return (
      <div>
      {
        !isFinish ?
        <div id="target">
        <img src="/static/post2.jpeg" className="canvas" alt="banner" />
          <p className="name">{name}</p>
        </div>
        :
        <img src={url} className="pic" alt=""/>
      }
      </div>
    )
  }
}
