import styles from './index.less';
import React from 'react';
import html2canvas from 'html2canvas';



export default class Index extends React.Component {
  constructor () {
    super();
    this.state = {
      url: '',
      isShowCanvas: false,
      isShowSecond: false,
      canvas: null,
      name: ''
    }
  }

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

  generatePost = () => {
    this.setState({
      isShowSecond: true
    }, () => {
      this.convertCanvasToImage('#target', html2canvas, (canvas) => {
        this.setState({
          isShowCanvas: true,
          url: canvas.toDataURL(),
        })
      });
    })
  }
  componentDidMount(){
  }

  render () {
    const {url, isShowCanvas, name, isShowSecond} = this.state
    return (
      <div>
        {
          !isShowSecond ?
          <div>
            <input type="text" value={name} placeholder="输入你的名字" onChange={(evt) => {this.setState({name: evt.target.value})}} />
            <button onClick={this.generatePost.bind(this)}>确认</button>
          </div>
          :
          null
        }
        {
          (isShowSecond && !isShowCanvas) ?
            <div id="target">
              <img src="/static/post2.jpeg" className={styles.canvas} alt="banner" />
              <p className={styles.name}>{name}</p>
            </div>
            :
            null
        }
        {
          isShowCanvas ?
            <img src={url} className={styles.pic} alt=""/>
            :
            null
        }
      </div>
    );
  }
}
