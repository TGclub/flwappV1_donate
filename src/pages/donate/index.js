import './index.less';
import React from 'react';
import axios from 'axios';


export default class Donate extends React.Component {
  componentDidMount() {
  // 配置wx权限
  //   wx.config({
  //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //     appId: '', // 必填，公众号的唯一标识
  //     timestamp: '' , // 必填，生成签名的时间戳
  //     nonceStr: '', // 必填，生成签名的随机串
  //     signature: '',// 必填，签名
  //     jsApiList: [] // 必填，需要使用的JS接口列表
  // });
  }
  

  constructor () {
    super();
    this.state = {
      name: '',
      money: '',
    }
  }

  // 捐赠
  donate = () => {
    if (!this.state.money || typeof parseInt(this.state.money) !== 'number') {
      return false;
    }
    if (!window.wx) {
      return alert('仅支持微信内使用')
    }
    // axios.get('http://whalepay.helloyzy.cn/whale/pay/create?openId=oauWk5NsvnCIWGRDOHPc-UOfB9Ek&amount=0.01&name=%e6%b8%b8%e6%9c%9d%e9%98%b3&phone=18292039753&returnUrl=https://www.baidu.com')
  }

  inputHandler = (evt) => {
    this.setState({
      money: evt.target.value
    })
  }

  nameHandler = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }

  render (){
    const { money, name } = this.state;
    return (
      <div>

        {/* logo区 */}
        <div className="logoWraper">
          <img className="logo-image" src="/static/whale.jpg" alt="logo"/>
          <p className="logo-title">寻找海鲸 共同成长 缔造传统 服务社会</p>
          <p className="logo-subTitle">Service for Whale</p>
        </div>

        {/* 分割线 */}
        <p className="splitLine"></p>

        {/* input框 */}
        <div className="donateWraper">
          <p className="donate-text">捐赠人姓名</p>
          <input className="donate-input donate-name" type="text"  value={name} onChange={this.nameHandler}/>
          <p className="donate-text">捐赠金额</p>
          <input className="donate-input" type="number" pattern="\d*" value={money} onChange={this.inputHandler}/>
          <div className="donate-btn" onClick={this.donate}>立即捐赠{money ? money + '￥' : ''}</div>
        </div>

        {/* 感谢文案 */}
        {
          name && <p className="thanks">{name}，感谢您的捐赠。</p>
        }
      </div>
    )
  }
}
