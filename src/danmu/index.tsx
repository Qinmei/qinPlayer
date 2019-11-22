import React, { useEffect, useRef, useContext, useState, useLayoutEffect } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';
import { fontArr, areaArr, opacityArr } from '../utils/utils';
import fetch from '../utils/request';
import Text from './text';

interface props {
  mode: string;
  size: number;
  area: number;
  opacity: number;
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 7;
  overflow: hidden;

  .con {
    width: 100%;
    height: ${(props: props) => areaArr[props.mode][props.area] * 100}%;
    color: white;
    font-size: ${(props: props) => fontArr[props.mode][props.size]}px;
    line-height: ${(props: props) => fontArr[props.mode][props.size] + 4}px;
    opacity: ${(props: props) => opacityArr[props.mode][props.opacity]};
  }
`;

interface PropsType {}

const reactComponent: React.FC<PropsType> = props => {
  const data = useContext(PlayerContext);
  const {
    state: { danmu, current, danmuArea, danmuFont, danmuShow, mode, danmuOpacity, play },
  } = data;

  if (!danmuShow) return <></>;

  const danmuRef: React.RefObject<T> = useRef(null);
  const countRef: React.RefObject<T> = useRef({});

  const [list, setList] = useState<Array<any>>([]);
  const [show, setShow] = useState<Array<any>>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  let [left, setLeft] = useState<number>(0);

  const initData = async (target: string) => {
    const data = await fetch(target).then(res => res.json());
    setList(data.data);
  };

  const filterData = (list: Array<any>) => {
    const data = list
      .filter(item => item.time <= current + 0.5 && item.time >= current - 0.5)
      .filter(item => !show.some(ele => ele._id === item._id));
    show.push(...data);
    setShow(show);
  };

  const draw = (list: Array<string>) => {};

  useEffect(() => {
    initData(danmu);
  }, [danmu]);

  useEffect(() => {
    filterData(list);
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
    <Wrapper ref={danmuRef} size={danmuFont} mode={mode} area={danmuArea} opacity={danmuOpacity}>
      <div className="con">
        {show.map(item => (
          <Text
            key={item._id}
            text={item.text}
            left={left}
            top={0}
            size={fontArr[mode][danmuFont]}
            width={width}
            play={play}
          ></Text>
        ))}
      </div>
    </Wrapper>
  );
};
export default reactComponent;
