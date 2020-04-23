import React, { useContext } from 'react';
import Icon from './icon';
import { PlayerContext } from '../../model';
import styled, { StyledComponent } from 'styled-components';

interface StyleProps {
  show: boolean;
}

const Wrapper = styled.div<StyleProps>`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  opacity: ${(props) => (props.show ? 1 : 0.4)};

  .iconfont {
    width: 25px;
    height: 20px;
    color: white;
    fill: currentColor;
  }
`;

const reactComponent = () => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color, subshow } = state;

  const toggle = () => {
    methods.changeSubShow(!subshow);
  };

  return (
    <Wrapper color={color} onClick={toggle} show={subshow}>
      <Icon type="subtitle" className="iconfont"></Icon>
    </Wrapper>
  );
};
export default reactComponent;
