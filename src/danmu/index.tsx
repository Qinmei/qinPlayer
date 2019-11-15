import React, { useEffect, useRef, useContext, useState, useLayoutEffect } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';
import { fontArr } from '../utils/utils';
import fetch from '../utils/request';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 7;
  overflow: hidden;

  .danmu {
    width: 100%;
    color: white;
    font-size: ${(props: { size: number; mode: string }) => fontArr[props.mode][props.size]}px;
    line-height: ${(props: { size: number; mode: string }) =>
      fontArr[props.mode][props.size] + 4}px;
    margin: 0;
  }
`;

interface PropsType {}

const reactComponent: React.FC<PropsType> = props => {
  const data = useContext(PlayerContext);
  const {
    state: { danmu, current, danmuArea, danmuFont, danmuShow, mode },
  } = data;

  if (!danmuShow) return <></>;

  const danmuRef: React.RefObject<T> = useRef(null);

  const [danmuData, setDanmuData] = useState<Array<any>>([]);
  const [show, setShow] = useState<Array<any>>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const initData = async (target: string) => {
    const data = await fetch(target).then(res => res.json());
    setDanmuData(data.data);
  };

  const filterData = (list: Array<any>) => {
    const data = list.filter(item => item.time <= current + 0.5).map(item => item.text);
    show.push(...data);
    setShow(show);
  };

  const draw = (list: Array<string>) => {};

  useEffect(() => {
    initData(danmu);
  }, [danmu]);

  useEffect(() => {
    filterData(danmuData);
  }, [current]);

  useEffect(() => {
    draw(show);
  }, [show]);

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    setWidth(danmuRef.current.clientWidth);
    setHeight(danmuRef.current.clientHeight);
  });

  return (
    <Wrapper ref={danmuRef} size={danmuFont} mode={mode}>
      <div className="danmu">东邪西毒</div>
      <div className="danmu">东邪西毒</div>
    </Wrapper>
  );
};
export default reactComponent;
