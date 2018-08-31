import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

// import style from './style';

const StyledButton = styled(Button)`
  &&& {
    color: red;
  }
`;

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="ui container">
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
