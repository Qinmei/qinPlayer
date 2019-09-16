import React, { useEffect, useRef, useState, useContext } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';
import { timeTransfer } from '../../utils/utils';

const Wrapper = styled.div`
  .message {
    position: absolute;
    bottom: 60px;
    left: 15px;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    border-radius: 4px;
    font-size: 14px;
    line-height: 14px;
  }
`;

const reactComponent: React.FC<{}> = props => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  return (
    <Wrapper color={color}>
      {state.message && <div className="message">{state.message}</div>}
    </Wrapper>
  );
};
export default reactComponent;
