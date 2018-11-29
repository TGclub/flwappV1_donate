import './index.less';
import React from 'react';
import html2canvas from 'html2canvas';
import qs from 'qs';
import Modal from 'react-modal';

const customStyles = {
  content: {
    height: '100%',
    width: '100%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,.75)'
  }
};
Modal.setAppElement('#root')
export default class Poster extends React.Component {
  getQueryString = (name) => {
    const paramObj = qs.parse(window.location.search.replace(/\?/, ''));
    return paramObj[name] ? paramObj[name] : null
  }
  componentDidMount() {
    const donateName = this.getQueryString('name');
    const date = new Date();
    console.log(donateName)
    if (!donateName) {
      alert('捐赠信息校验失败！')
      window.history.go(-1);
    }
    // html2img
    this.setState({
      name: donateName,
      year: date.getFullYear(),
      month: parseInt(date.getMonth(), 10) + 1,
      day: date.getDate()
    }, () => {
      setTimeout(() => {
        this.convertCanvasToImage('#target', html2canvas, (canvas) => {
          this.setState({
            url: canvas.toDataURL(),
          }, () => {
            this.setState({
              isFinish: true,
            });
          })
        });
      }, 100)
    });

    // close the modal
    setTimeout(() => {
      this.closeModal()
    },2000)
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
      modalIsOpen: true
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  /**
   * 通过canvas生成图片
   * @param dom dom节点的id
   * @param html2Canvas 库
   * @param cb 回调函数
   */
  convertCanvasToImage(dom, html2Canvas, cb) {
    const captureContent = document.querySelector(dom);
    const width = captureContent.offsetWidth;
    const height = captureContent.offsetHeight;
    const canvas = document.createElement('canvas');
    const scale = 2;
    canvas.height = height * scale;
    canvas.width = width * scale;
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
    const { isFinish, name, year, month, day, url } = this.state
    return (
      <div>
        {
          !isFinish ?
            <div id="target">
              <img src="/static/post2.jpeg" className="canvas" alt="banner" />
              <p className="name">{name}</p>
              <p className="year">{year}</p>
              <p className="month">{month}</p>
              <p className="day">{day}</p>
            </div>
            :
            <img src={url} className="pic" alt="" />
        }        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <p className="hint">长按保存您的纪念证书</p>
        </Modal>
      </div>
    )
  }
}
