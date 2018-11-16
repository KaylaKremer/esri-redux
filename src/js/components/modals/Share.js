import { toggleShareModal } from 'js/actions/mapActions';
import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';
import appStore from 'js/appStore';
import twitter from '../../../images/twitter.png';

export default class ShareModal extends Component {
  displayName: 'ShareModal';

  close = () => {
    appStore.dispatch(toggleShareModal({ visible: false }));
  };

  shareTwitter = event => {
    event.preventDefault();
    window.open("https://twitter.com/share?url=" + encodeURIComponent(window.location), false);
  }

  render () {
    let { visible } = this.props;

    // Add social media sharing on Twitter
    return (
      <Wrapper theme='share-modal' visible={visible} close={this.close}>
        <h3>Share on Twitter</h3>
        <button id="twitter" onClick={this.shareTwitter}><img src={twitter} alt="Share on Twitter" /></button>
      </Wrapper>
    );
  }
}
