import React, { useEffect, useRef, useState, useContext, Children } from 'react';
import styles from './style.less';
import Icon from './icon';
import { PlayerContext } from './model';

interface PropsType {
  children?: any;
}

interface DataProps {
  state: any;
  dispatch: (value: any) => void;
}

const reactComponent: React.FC<PropsType> = props => {
  const { children } = props;

  const data: DataProps = useContext(PlayerContext);
  const { state, dispatch } = data;

  const changePlay = () => {
    console.time('sss');
    dispatch({
      play: !state.play,
    });
  };

  useEffect(() => {
    console.timeEnd('sss');
  }, [state.play]);

  return (
    <div className={styles.control}>
      <div className={styles.bar}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={styles.line}></div>
          </div>
          <div className={styles.option}>
            <div className={styles.left}>
              <div className={styles.icon} onClick={changePlay}>
                <Icon type="play" className={styles.iconfont}></Icon>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.icon}>
                <Icon type="volume2" className={styles.iconfont}></Icon>
              </div>
              <div className={styles.icon}>
                <Icon type="setting" className={styles.iconfont}></Icon>
              </div>
              <div className={styles.icon}>
                <Icon type="intotheater" className={styles.iconfont}></Icon>
              </div>
              <div className={styles.icon}>
                <Icon type="fullscreen" className={styles.iconfont}></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reactComponent;
