import './index.less';
import React from 'react';


export default class Donate extends React.Component {

  constructor () {
    super();
    this.state = {
      money: '',
    }
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
          <div className="donate-btn">立即捐赠{money ? money + '￥' : ''}</div>
        </div>

        {/* 感谢文案 */}
        {
          name && <p className="thanks">{name}，感谢您的捐赠。</p>
        }
      </div>
    )
  }
}
