import React, { Component } from 'react';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="exhibition">
        {React.cloneElement(this.props.children, {
          account: this.props.data.account
        })}
      </div>
    );
  }
}

export default DefaultLayout;
