import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';
import { timeTransfer } from '../../utils/utils';
import Thumbnail from '../components/thumbnail';

const Wrapper = styled.div`
  position: absolute;
  top: -8px;
  left: 15px;
  width: calc(100% - 30px);
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -5px;
  z-index: 19;
  cursor: pointer;

  .line {
    position: relative;
    height: 3px;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);

    .buffered {
      z-index: -1;
      left: 0;
      top: 0;
      position: absolute;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.6);
    }

    .current {
      height: 100%;
      position: relative;

      &:after {
        content: '';
        display: none;
        position: absolute;
        right: 0;
        top: 1px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: inherit;
        transform: translate(50%, -43.75%);
      }
    }
  }

  .currentTime {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 3px 6px;
    border-radius: 3px;
    display: inline-block;
    position: absolute;
    top: -5px;
    transform: translate(-50%, -100%);
    display: none;
    font-size: 12px;
    color: white;
    z-index: -1;
    pointer-events: none;
  }

  .thumbnail {
    position: absolute;
    z-index: -2;
    background-color: black;
    width: 160px;
    height: 90px;
    top: -95px;
    transform: translateX(-50%);
    display: none;
    z-index: -2;
    pointer-events: none;
  }

  &:hover {
    .currentTime,
    .thumbnail {
      display: inline-block;
    }

    .current:after {
      display: inline-block;
    }
  }
`;

const reactComponent: React.FC<{}> = props => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  const progressRef: React.RefObject = useRef(null);

  const [current, setCurrent] = useState(state.current); // 进度条
  const [show, setShow] = useState(false); // 点击拖动进度条判断
  const [currentTime, setCurrentTime] = useState(0); // 进度条滑动时间显示

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!show) return;
    const seeked = getSeeked(e);
    setCurrent(seeked);
    methods.changeSeeked(seeked);
    setShow(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const seeked = getSeeked(e);
    show && setCurrent(seeked);
  };

  const onMouseMoveCurrentTime = (e: React.MouseEvent) => {
    onMouseMove(e);
    const seeked = getSeeked(e);
    setCurrentTime(seeked);
  };

  const getSeeked = (e: React.MouseEvent) => {
    const positionX = window.pageXOffset + progressRef.current.getBoundingClientRect().left;
    const offset = e.pageX - positionX;
    const total = progressRef.current.clientWidth;
    let percent = offset / total;
    percent > 1 && (percent = 1);
    percent < 0 && (percent = 0);
    const seeked = state.duration * percent;
    return seeked;
  };

  useEffect(() => {
    !show && setCurrent(state.current);
  }, [state.current]);

  return (
    <Wrapper
      color={color}
      className="progress"
      ref={progressRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMoveCurrentTime}
      onMouseLeave={onMouseUp}
    >
      <div className="line">
        <div
          className="current"
          style={{
            backgroundColor: state.color,
            width: (current / state.duration) * 100 + '%',
          }}
        ></div>
        {state.buffered.map((item: Array<number>, index: number) => (
          <div
            key={index}
            className="buffered"
            style={{
              left: (item[0] / state.duration) * 100 + '%',
              width: ((item[1] - item[0]) / state.duration) * 100 + '%',
            }}
          ></div>
        ))}

        <div className="currentTime" style={{ left: (currentTime / state.duration) * 100 + '%' }}>
          {timeTransfer(currentTime)}
        </div>

        <Thumbnail currentTime={currentTime} progressRef={progressRef}></Thumbnail>
      </div>
    </Wrapper>
  );
};
export default reactComponent;
