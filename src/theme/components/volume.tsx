import React, { useEffect, useRef, useState, useContext } from 'react';
import Icon from './icon';
import { PlayerContext } from '../../model';
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

  .volumePanel {
    width: 35px;
    position: absolute;
    bottom: 30px;
    left: 17.5px;
    transform: translate(-50%, 0);
    z-index: 29;
    display: none;

    .volumeCon {
      width: 100%;
      background-color: rgba(21, 21, 21, 0.9);
      border-radius: 3px;
      font-size: 12px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6px 0 10px 0;
      justify-content: space-between;
      margin-bottom: 16px;
      position: relative;

      .volumeBg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        top: 0;
        left: 0;
        z-index: 29;
      }

      .volumeProgress {
        margin-top: 8px;
        height: 70px;
        width: 2px;
        background-color: rgba(255, 255, 255, 0.6);
        display: flex;
        align-items: flex-end;

        span {
          user-select: none;
        }

        .volumeCurrent {
          width: 100%;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: -4px;
            top: 0px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: inherit;
          }
        }
      }
    }
  }

  &:hover {
    .volumePanel {
      display: inline-block;
    }
  }
`;

const reactComponent: React.FC<{}> = (props) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  const volumeRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [volumeShow, setVolumeShow] = useState(false); //音量拖动条点击判断
  const [currentVolume, setCurrentVolume] = useState(75); // 当前音量显示

  const onVolumeDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVolumeShow(true);
  };

  const onVolumeUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!volumeShow) return;
    const volume = getVolume(e);
    if (typeof volume === 'object') return;
    methods.changeVolume(volume / 100);
    setVolumeShow(false);
  };

  const onVolumeMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const volume = getVolume(e);
    if (typeof volume === 'object') return;
    setVolumeShow && setCurrentVolume(volume);
  };

  const onVolumeMute = (e: React.MouseEvent) => {
    methods.changeVolume(state.volume ? 0 : 0.75);
  };

  const getVolume = (e: React.MouseEvent) => {
    if (e.target !== volumeRef.current) return;
    const offset = e.nativeEvent.offsetY;
    const total = volumeRef.current ? volumeRef.current.clientHeight : 0;

    if (total === 0) return null;
    let height = total - 8 - offset;
    height <= 0 && (height = 0);
    height > 70 && (height = 70);
    return Math.round((height / 70) * 100);
  };

  const volumeNum = (volume: number) => {
    if (volume === 0) {
      return 'volume0';
    } else if (volume < 0.5) {
      return 'volume1';
    } else if (volume < 1) {
      return 'volume2';
    } else if (volume === 1) {
      return 'volume3';
    } else {
      return 'volume1';
    }
  };

  useEffect(() => {
    !volumeShow && setCurrentVolume(Math.round(state.volume * 100));
  }, [state.volume]);

  return (
    <Wrapper color={color} onMouseUp={onVolumeMute}>
      <Icon type={volumeNum(state.volume)} className="iconfont"></Icon>
      <div className="volumePanel">
        <div className="volumeCon">
          <div
            className="volumeBg"
            ref={volumeRef}
            onMouseMove={onVolumeMove}
            onMouseUp={onVolumeUp}
            onMouseDown={onVolumeDown}
            onMouseOut={onVolumeUp}
          ></div>
          <span>{currentVolume}</span>
          <div className="volumeProgress">
            <div
              className="volumeCurrent"
              style={{
                backgroundColor: color,
                height: currentVolume + '%',
              }}
            ></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default reactComponent;
