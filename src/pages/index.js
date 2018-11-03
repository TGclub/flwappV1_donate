import styles from './index.less';
import React from 'react';
import Poster from './poster/poster'



export default class Index extends React.Component {
  constructor () {
    super();
    this.state = {
    }
  }


  render () {
    // const {url, isShowCanvas, name, isShowSecond} = this.state
    return (
      <div>
        Hello This Is Index
      </div>
    );
  }
}
