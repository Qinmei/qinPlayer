/*
 * 方案一:直接在给数组添加left, top属性, 然后使用帧动画更新数组;
 * 缺点: 动画效果卡顿, 每次更新后的渲染时间在200ms, 弹幕一顿一顿的;
 * 优点:使用简单, 可控制动画的暂停启动, 无需关注时间, 只需维护数组;
 * 反思:可能是组件依赖过多, 导致每次render时间过长, 下一步尝试将位移动画提成组件, 减少依赖, 提高动画流畅度
 * 最终总结:经过几次尝试,应该还是react的更新机制问题,数组已经更新但是没有更新UI, 直到更上层的context每200ms渲染一次, 导致动画卡顿, 于是创建一个state, 每次函数执行的时候强制更新, 导致render间隔为33ms左右, 30fps
 */

import React, { useEffect, useRef, useContext, useState, useLayoutEffect } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';
import { fontArr, areaArr, opacityArr, getFontLength } from '../utils/utils';
import fetch from '../utils/request';

export interface DanmuText {
  id: string;
  time: number;
  text: string;
  color: string;
  type: number;
}

interface DanmuTextShow extends DanmuText {
  left: number;
  top: number;
}

interface WrapperType {
  size: number;
  mode: string;
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
    height: ${(props: WrapperType) => areaArr[props.mode][props.area] * 100}%;
    color: white;
    font-size: ${(props: WrapperType) => fontArr[props.mode][props.size]}px;
    line-height: ${(props: WrapperType) => fontArr[props.mode][props.size] + 4}px;
    opacity: ${(props: WrapperType) => opacityArr[props.mode][props.opacity]};

    .danmu {
      position: absolute;
      display: inline-block;
      right: ${(props: WrapperType) => props.width}px;
      white-space: nowrap;
      transition: all 200 linear;
    }
  }
`;

const reactComponent = () => {
  const data = useContext(PlayerContext);
  const {
    state: {
      danmu,
      current,
      danmuArea,
      danmuFont,
      danmuShow,
      mode,
      danmuOpacity,
      play,
      danmuFront = (res: any) => res.data,
    },
  } = data;

  if (!danmuShow) return <></>;

  const danmuRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const storeRef = useRef<any>({});

  if (!storeRef.current.top) {
    storeRef.current.top = [];
  }

  const [list, setList] = useState<DanmuText[]>([]);
  const [show, setShow] = useState<DanmuTextShow[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [total, setTotal] = useState(0);
  let [toggle, setToggle] = useState(0);

  const initData = async (target: string) => {
    const data = await fetch(target)
      .then((res) => res.json())
      .then((res) => danmuFront(res));
    setList(data);
    // const data = [...Array(300).keys()].map((item) => ({
    //   id: item,
    //   time: Math.random() * 10,
    //   text: Math.random().toString(),
    //   color: 'white',
    //   type: 0,
    // }));
    // setList(data);
  };

  const filterData = (list: DanmuText[]) => {
    list
      .filter(
        (item) =>
          item.time < current + 0.5 &&
          item.time > current - 0.5 &&
          !show.some((ele) => ele.id === item.id),
      )
      .map((item) => {
        draw(item);
      });
  };

  const draw = async (value: any) => {
    const result = getEmptyDanmuTop();
    const selfWidth = (getFontLength(value.text) * fontArr[mode][danmuFont]) / 2;
    const preLeft = width + selfWidth;
    show.push({
      ...value,
      left: result.left < width ? preLeft : result.left + 30 + selfWidth,
      top: result.top,
    });
    setShow(show);
  };

  const getEmptyDanmuTop = () => {
    show.map((item) => {
      const left = item.left;
      const top = item.top;
      storeRef.current.top[top] = {
        left,
        top,
      };
    });

    let result = [...storeRef.current.top].sort((a, b) => a.left - b.left);
    const lessDanmu = result
      .filter((item) => item.top < total / 2 && item.top > 0 && Math.abs(width - item.left) < 100)
      .sort((a, b) => a.top - b.top);
    if (lessDanmu.length > 0) {
      result = lessDanmu;
    }

    return result[0];
  };

  const start = () => {
    show.map((item) => {
      item.left -= 3;
    });

    for (let index = 0; index < show.length; index++) {
      const element = show[index];
      if (element.left < 0) {
        show.splice(index, 1);
        index--;
      }
    }

    setToggle(toggle++);
    storeRef.current.play = requestAnimationFrame(start);
  };

  const stop = () => {
    if (storeRef.current.play) {
      cancelAnimationFrame(storeRef.current.play);
    }
  };

  useEffect(() => {
    if (play) {
      start();
    } else {
      stop();
    }
  }, [play]);

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
    >
      <div className="con">
        {show.map((item) => (
          <div
            className="danmu"
            key={item.id}
            style={{
              transform: `translateX(${item.left}px)`,
              top: item.top * (fontArr[mode][danmuFont] + 4),
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
export default reactComponent;
