import React, { useContext } from 'react';
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

interface PropsType {
  onChange?: () => void;
}

const reactComponent = (props: PropsType) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { onChange } = props;

  const fullToogle = () => {
    methods.changeScreen();
    onChange && onChange();
  };

  return (
    <Wrapper onClick={fullToogle}>
      <Icon type="fullscreen" className="iconfont"></Icon>
    </Wrapper>
  );
};
export default reactComponent;
