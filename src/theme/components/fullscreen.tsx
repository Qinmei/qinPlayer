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

  .tips {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 5px 8px;
    border-radius: 3px;
    top: -8px;
    left: 17.5px;
    transform: translate(-50%, -100%);
    display: none;
    font-size: 12px;
    color: white;
    white-space: pre;
    user-select: none;
  }

  &:hover {
    .tips {
      display: inline-block;
    }
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
      <div className="tips">{lang[state.lang]['fullscreen']}</div>
    </Wrapper>
  );
};
export default reactComponent;
