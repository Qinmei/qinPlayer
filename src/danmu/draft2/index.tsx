/*
 * 方案二:将动画放在单独的组件中实现, 减少动画依赖;
 * 缺点:占用依旧很高, 弹幕数量少的时候渲染较快, 但是数量一多就比较慢;
 * 优点:控制简单;
 * 反思:需要组件实时回传数据到父组件, 可能会对性能造成负担, 先研究下能不能优化, 或者将将弹幕的全部位移放在一个组件中
 */

import React, { useEffect, useRef, useContext, useState, useLayoutEffect } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';
import { fontArr, areaArr, opacityArr, getFontLength } from '../../utils/utils';
import fetch from '../../utils/request';
import Text from './text';

interface props {
  mode: string;
  size: number;
  area: number;
  opacity: number;
  width: number;
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
  const storeRef: React.RefObject<T> = useRef({});

  if (!storeRef.current.top) {
    storeRef.current.top = [];
  }

  const [list, setList] = useState<Array<any>>([]);
  const [show, setShow] = useState<Array<any>>([]);
  const [width, setWidth] = useState<number>(0);
  const [total, setTotal] = useState(0);

  const initData = async (target: string) => {
    const data = await fetch(target).then(res => res.json());
    setList(data.data);
  };

  const filterData = (list: Array<any>) => {
    list
      .filter(
        item =>
          item.time < current + 0.5 &&
          item.time > current - 0.5 &&
          !show.some(ele => ele._id === item._id),
      )
      .map(item => {
        draw(item);
      });
  };

  const draw = (value: any) => {
    const result = getEmptyDanmuTop();
    const selfWidth = (getFontLength(value.text) * fontArr[mode][danmuFont]) / 2;
    const preLeft = width + selfWidth;
    const item = {
      ...value,
      left: result.left < width ? preLeft : result.left + 30 + selfWidth,
      top: result.top,
    };
    show.push(item);
    updateDanmuTop(item._id, item.left, item.top, true);
    setShow(show);
  };

  const getEmptyDanmuTop = () => {
    let result = [...storeRef.current.top].sort((a, b) => a.left - b.left);

    const lessDanmu = result
      .filter(item => item.top < total / 2 && item.top > 0 && Math.abs(width - item.left) < 100)
      .sort((a, b) => a.top - b.top);
    if (lessDanmu.length > 0) {
      result = lessDanmu;
    }

    return result[0];
  };

  const updateDanmuTop = (id: string, left: number, top: number = 0, add: boolean = false) => {
    if (add) {
      storeRef.current.top[top] = {
        id,
        left,
        top,
      };
    } else {
      storeRef.current.top.map((item: any) => {
        if (item.id === id) {
          item.left = left;
        }
      });
    }
  };

  const cancel = (value: string) => {
    const newShow = show.filter(item => item._id !== value);
    setShow(newShow);
  };

  const danmuChange = (id: string, left: number) => {
    if (left < -2) {
      cancel(id);
    }
    updateDanmuTop(id, left);
  };

  useEffect(() => {
    initData(danmu);
  }, [danmu]);

  useEffect(() => {
    filterData(list);
  }, [current]);

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    setWidth(danmuRef.current.clientWidth);
    const newTotal =
      Math.floor((danmuRef.current.clientHeight - 40) / fontArr[mode][danmuFont] + 4) - 1;

    if (newTotal === total) return;
    [...Array(newTotal)].map((item, index) => {
      if (!storeRef.current.top[index]) {
        storeRef.current.top[index] = {
          left: -1,
          top: index,
          id: null,
        };
      }
    });
    storeRef.current.top.length = newTotal;

    setTotal(newTotal);
  });

  return (
    <Wrapper
      ref={danmuRef}
      size={danmuFont}
      mode={mode}
      area={danmuArea}
      opacity={danmuOpacity}
      width={width}
      play={play}
    >
      <div className="con">
        {show.map(item => (
          <Text
            key={item._id}
            id={item._id}
            text={item.text}
            left={item.left}
            top={item.top}
            width={width}
            play={play}
            height={fontArr[mode][danmuFont] + 4}
            onChange={danmuChange}
          ></Text>
        ))}
      </div>
    </Wrapper>
  );
};
export default reactComponent;
