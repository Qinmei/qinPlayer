import React, { useEffect, useRef, useState, useContext, Children } from 'react';
import styles from './style.less';
import Icon from './icon';
import { PlayerContext } from './model';
import { timeTransfer } from './utils';
import lang from './local';

interface PropsType {
  color?: string;
}

interface DataProps {
  state: any;
  dispatch: (value: any) => void;
  methods: any;
}

const volumeNode = (volume: number) => {
  if (volume === 0) {
    return <Icon type="volume0" className={styles.iconfont}></Icon>;
  } else if (volume < 0.5) {
    return <Icon type="volume1" className={styles.iconfont}></Icon>;
  } else if (volume < 1) {
    return <Icon type="volume2" className={styles.iconfont}></Icon>;
  } else if (volume === 1) {
    return <Icon type="volume3" className={styles.iconfont}></Icon>;
  }
};

const reactComponent: React.FC<PropsType> = props => {
  const { color } = props;
  const data: DataProps = useContext(PlayerContext);
  const { methods, state } = data;

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

  const getThumbnailLeft = (currentTime: number) => {
    const percent = currentTime / state.duration;
    const total = progressRef.current ? progressRef.current.clientWidth : 0;
    let result = percent * total;
    result < 80 && (result = 80);
    total - result < 80 && (result = total - 80);
    return (result / total) * 100;
  };

  const getThumbnailImg = (currentTime: number) => {
    const percent = currentTime / state.duration;
    const { count, urls } = state.thumbnail;
    const num = Math.round(count * percent);
    const page = Math.floor(num / 100);
    const row = Math.floor((num - 100 * page) / 10);
    const col = num - 100 * page - 10 * row;
    return {
      url: urls[page],
      left: row * 160 + 'px',
      top: col * 90 + 'px',
    };
  };

  useEffect(() => {
    !show && setCurrent(state.current);
  }, [state.current]);

  return (
    <div
      className={`${styles.control} ${state.play ? styles.play : styles.pause}`}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseUp}
    >
      {state.message && <div className={styles.message}>{state.message}</div>}
      {state.loading && <Icon type="loading" className={styles.loading}></Icon>}

      <div className={styles.bar}>
        <div className={styles.content}>
          <div
            className={styles.progress}
            ref={progressRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMoveCurrentTime}
          >
            <div className={styles.line}>
              <div
                className={styles.current}
                style={{
                  backgroundColor: color,
                  width: (current / state.duration) * 100 + '%',
                }}
              ></div>
              {state.buffered.map((item: Array<number>, index: number) => (
                <div
                  key={index}
                  className={styles.buffered}
                  style={{
                    left: (item[0] / state.duration) * 100 + '%',
                    width: ((item[1] - item[0]) / state.duration) * 100 + '%',
                  }}
                ></div>
              ))}

              <div
                className={styles.currentTime}
                style={{ left: (currentTime / state.duration) * 100 + '%' }}
              >
                {timeTransfer(currentTime)}
              </div>

              <div
                className={styles.thumbnail}
                style={{
                  left: getThumbnailLeft(currentTime) + '%',
                  backgroundImage: `url(${getThumbnailImg(currentTime).url})`,
                  backgroundPosition: `${getThumbnailImg(currentTime).left} ${
                    getThumbnailImg(currentTime).top
                  }`,
                }}
              ></div>
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.left}>
              <div className={styles.icon} onClick={() => methods.changePlay()}>
                {state.play ? (
                  <Icon type="pause" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="play" className={styles.iconfont}></Icon>
                )}
              </div>
              <div className={styles.duration}>
                <span>{timeTransfer(state.current)}</span>
                <span> / </span>
                <span>{timeTransfer(state.duration)}</span>
              </div>
            </div>
            <div className={styles.right}>
              <div
                className={styles.icon}
                onClick={() => methods.changeVolume(state.volume ? 0 : 0.75)}
              >
                {volumeNode(state.volume)}
              </div>
              <div className={styles.icon}>
                <Icon type="setting" className={styles.iconfont}></Icon>
              </div>
              <div className={styles.icon} onClick={() => methods.changePicture()}>
                <Icon type="picture" className={styles.iconfont}></Icon>
                <div className={styles.tips}>{lang[state.lang].picture}</div>
              </div>
              <div className={styles.icon} onClick={() => methods.changeMovie()}>
                {state.movie ? (
                  <Icon type="exittheater" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="intotheater" className={styles.iconfont}></Icon>
                )}
                <div className={styles.tips}>
                  {lang[state.lang][state.movie ? 'exittheater' : 'intotheater']}
                </div>
              </div>
              <div className={styles.icon} onClick={() => methods.changeScreen()}>
                {state.fullscreen ? (
                  <Icon type="exitscreen" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="fullscreen" className={styles.iconfont}></Icon>
                )}
                <div className={styles.tips}>
                  {lang[state.lang][state.fullscreen ? 'exitscreen' : 'fullscreen']}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reactComponent;
