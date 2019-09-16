import React, { useContext } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';
import Icon from './icon';

const Wrapper = styled.div`
  .loading {
    width: 45px;
    height: 45px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 1s linear infinite;
    fill: white;

    @keyframes rotate {
      from {
        transform: rotateZ(0);
      }
      to {
        transform: rotateZ(360deg);
      }
    }
  }
`;

const reactComponent: React.FC<{}> = props => {
  const data = useContext(PlayerContext);
  const { state } = data;

  return <Wrapper>{state.loading && <Icon type="loading" className="loading"></Icon>}</Wrapper>;
};
export default reactComponent;
