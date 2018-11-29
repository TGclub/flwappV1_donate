import './index.less';
import React from 'react';
import axios from 'axios';
import qs from 'qs';

// TODO: 更换服务器URL
const returnURL = 'http://192.168.31.204:8999/poster.html'

const getQueryString = (name) => {
  const paramObj = qs.parse(window.location.search.replace(/\?/, ''));
  return paramObj[name] ? paramObj[name] : null
}

const getPayURL = (openId, amount, returnURL, name, phone) => {
  // oauWk5NsvnCIWGRDOHPc-UOfB9Ek
  // return `http://whalepay.helloyzy.cn/whale/pay/create?openId=${openId}&amount=${amount}&name=%e6%b8%b8%e6%9c%9d%e9%98%b3&phone=18292039753&returnUrl=${returnURL}`
  return `http://whalepay.helloyzy.cn/whale/pay/create?openId=${openId}&amount=${amount}&name=${name}&phone=${phone}&returnUrl=${returnURL}?name=${name}`
}


export default class Donate extends React.Component {
  componentDidMount() {
    // 读URL参数,读出openid, 填入pay的URL
    const openid = getQueryString('openid')
    console.log(openid)
    if (!openid) {
      alert('捐赠信息校验失败！')
      window.history.go(-1);
    }
    this.setState({
      openid: openid,
    })
  }


  constructor() {
    super();
    this.state = {
      name: '',
      money: '',
      openid: null,
      phone: '',
    }
  }

  // 捐赠
  donate = () => {
    if (!this.state.openid || !this.state.phone ||!this.state.name || !this.state.money || typeof parseInt(this.state.money, 10) !== 'number') {
      return false;
    }
    if (!window.wx) {
      return alert('仅支持微信内使用')
    }
    // TODO: 释放金额
    // window.location.href = getPayURL(this.state.openid, this.state.money, returnURL, this.state.name);
    window.location.href = getPayURL(this.state.openid, 0.01, returnURL, this.state.name);
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

  phoneHandler = (evt) => {
    this.setState({
      phone: evt.target.value
    })
  }

  render() {
    const { money, name, phone } = this.state;
    return (
      <div>

        {/* logo区 */}
        <div className="logoWraper">
          <img className="logo-image" src="/static/whale.jpg" alt="logo" />
          <p className="logo-title">寻找海鲸 共同成长 缔造传统 服务社会</p>
          <p className="logo-subTitle">Service for Whale</p>
        </div>

        {/* 分割线 */}
        <p className="splitLine"></p>

        {/* input框 */}
        <div className="donateWraper">
          <p className="donate-text">捐赠人姓名</p>
          <input className="donate-input donate-name" type="text" value={name} onChange={this.nameHandler} />
          <p className="donate-text">捐赠人电话</p>
          <input className="donate-input donate-name" type="number" pattern="\d*" value={phone} onChange={this.phoneHandler} />
          <p className="donate-text">捐赠金额</p>
          <input className="donate-input" type="number" pattern="\d*" value={money} onChange={this.inputHandler} />
          <div className="donate-btn" onClick={this.donate}>立即捐赠{money ? money + '￥' : ''}</div>
        </div>

        <div className="block"></div>
        {/* 感谢文案 */}
        {
          name && <p className="thanks">{name}，感谢您的捐赠。</p>
        }
      </div>
    )
  }
}
