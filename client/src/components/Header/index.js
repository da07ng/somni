import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './style';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header" className={style.header}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
