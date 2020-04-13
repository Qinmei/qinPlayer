import React, { useEffect, useState, useContext } from 'react';
import Icon from './icon';
import { PlayerContext } from '../../model';
import lang from '../../utils/local';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  .iconfont {
    width: 25px;
    height: 20px;
    color: white;
    fill: currentColor;
  }
`;

const reactComponent: React.FC<{}> = (props) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;

  return (
    <Wrapper onClick={() => methods.changePlay()}>
      <Icon type={state.play ? 'pause' : 'play'} className="iconfont"></Icon>
    </Wrapper>
  );
};
export default reactComponent;
