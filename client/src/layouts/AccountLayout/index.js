import React, { Component } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class AccountLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="account">
        <Header account={this.props.data.account} />
        {React.cloneElement(this.props.children, {
          account: this.props.data.account
        })}
        <Footer />
      </div>
    );
  }
}

export default AccountLayout;
