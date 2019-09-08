import React, { useEffect, useRef, useState, useContext, Children } from 'react';
import styles from './style.less';
import Icon from './icon';
import { PlayerContext } from './model';
import { timeTransfer } from './utils';

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

  const [current, setCurrent] = useState(state.current);
  const [show, setShow] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    console.log('clickup');
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
    e.preventDefault();
    const seeked = getSeeked(e);
    show && setCurrent(seeked);
  };

  const getSeeked = (e: React.MouseEvent) => {
    const offset = e.nativeEvent.offsetX;
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
              <div className={styles.icon} onClick={() => methods.changeMovie()}>
                {state.movie ? (
                  <Icon type="exittheater" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="intotheater" className={styles.iconfont}></Icon>
                )}
              </div>
              <div className={styles.icon} onClick={() => methods.changeScreen()}>
                {state.fullscreen ? (
                  <Icon type="exitscreen" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="fullscreen" className={styles.iconfont}></Icon>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reactComponent;
