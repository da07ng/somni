import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import style from './style';

const StyledButton = styled(Button)`
  &&& {
    color: red;
  }
`;

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="footer" className={style.footer}>
        <div className="container">
          <a href="/" className="">
            InfoVis
          </a>
          <StyledButton>Click Here</StyledButton>
        </div>
      </div>
    );
  }
}

export default Footer;
