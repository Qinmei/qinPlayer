import React, { useEffect, useRef, useState, useContext } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';
import { timeTransfer } from '../../utils/utils';

const Wrapper = styled.div`
  user-select: none;
  margin-left: 8px;
  color: white;
  opacity: 0.8;
  font-size: 13px;
`;

const reactComponent: React.FC<{}> = props => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  return (
    <Wrapper color={color}>
      <span>{timeTransfer(state.current)}</span>
      <span> / </span>
      <span>{timeTransfer(state.duration)}</span>
    </Wrapper>
  );
};
export default reactComponent;
