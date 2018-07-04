import React, { Component } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="default-layout">
        <Header />
        {React.cloneElement(this.props.children, { data: this.props.data })}
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout;
