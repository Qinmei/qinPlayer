import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  Children,
} from 'react';
import styles from './style.less';
import Icon from './icon';
import { PlayerContext } from './model';

interface PropsType {
  children?: any;
  color?: string;
}

interface DataProps {
  state: any;
  dispatch: (value: any) => void;
  methods: any;
}

const reactComponent: React.FC<PropsType> = props => {
  const data: DataProps = useContext(PlayerContext);
  const { methods, state } = data;

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

  return (
    <div className={styles.control}>
      {state.message && <div className={styles.message}>{state.message}</div>}
      <div className={styles.bar}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={styles.line}></div>
          </div>
          <div className={styles.option}>
            <div className={styles.left}>
              <div className={styles.icon} onClick={methods.changePlay}>
                {state.play ? (
                  <Icon type="pause" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="play" className={styles.iconfont}></Icon>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <div
                className={styles.icon}
                onClick={() => {
                  methods.changeVolume(state.volume ? 0 : 0.75);
                }}
              >
                {volumeNode(state.volume)}
              </div>
              <div className={styles.icon}>
                <Icon type="setting" className={styles.iconfont}></Icon>
              </div>
              <div className={styles.icon} onClick={methods.changeMovie}>
                {state.movie ? (
                  <Icon type="exittheater" className={styles.iconfont}></Icon>
                ) : (
                  <Icon type="intotheater" className={styles.iconfont}></Icon>
                )}
              </div>
              <div className={styles.icon} onClick={methods.changeScreen}>
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
