import React, { Component } from 'react';

// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="exhibition">
        {/* <Header /> */}
        {React.cloneElement(this.props.children, {
          account: this.props.data.account
        })}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default DefaultLayout;
