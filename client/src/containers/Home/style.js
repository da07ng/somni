import styled from 'styled-components';
import {
  Header
} from 'semantic-ui-react';

const HeaderH1 = styled(Header)`
&&& {
  font-size: ${props => (props.mobile ? '2em' : '4em')};
  font-weight: normal;
  margin-bottom: 0;
  margin-top: ${props => (props.mobile ? '1.5em' : '3em')};
}
`;

const HeaderH2 = styled(Header)`
&&& {
  font-size: ${props => (props.mobile ? '1.5em' : '1.7em')};
  font-weight: normal;
  margin-top: ${props => (props.mobile ? '0.5em' : '1.5em')};
}
`;

export {
  HeaderH1,
  HeaderH2
}
