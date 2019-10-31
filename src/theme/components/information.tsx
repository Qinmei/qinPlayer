import React, { useContext, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';
import Icon from './icon';
import lang from '../../utils/local';

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  min-width: 80px;
  height: 50px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -25px;
  margin-left: -60px;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  .iconfont {
    width: 35px;
    height: 35px;
    fill: currentColor;
  }

  .iconfont2 {
    width: 30px;
    height: 40px;
    fill: currentColor;
  }

  .text {
    font-size: 18px;
  }
`;

const reactComponent: React.FC<{}> = (props, ref) => {
  const data = useContext(PlayerContext);
  const { state } = data;

  const [show, setShow] = useState(false);
  const [type, setType] = useState('volume');

  const methods = {
    init: (type: string) => {
      setType(type);
      showInfo();
    },
  };

  const debounce = (fun: any, time: number) => {
    let t: any = undefined;
    return (args?: any) => {
      clearTimeout(t);
      t = setTimeout(() => fun(args), time);
    };
  };

  const hide = useRef(debounce(() => setShow(false), 1500));

  const showInfo = () => {
    setShow(true);
    hide.current();
  };
  useImperativeHandle(ref, () => methods);

  return show ? (
    <Wrapper>
      {type === 'volume' && (
        <>
          <Icon type="volume2" className="iconfont"></Icon>
          <span className="text">{Math.ceil(state.volume * 100)}%</span>
        </>
      )}

      {type === 'forward' && (
        <>
          <Icon type="forward" className="iconfont2"></Icon>
          <span className="text">{lang[state.lang].forward}</span>
        </>
      )}

      {type === 'backward' && (
        <>
          <Icon type="backward" className="iconfont2"></Icon>
          <span className="text">{lang[state.lang].backward}</span>
        </>
      )}
    </Wrapper>
  ) : (
    <></>
  );
};
export default forwardRef(reactComponent);
