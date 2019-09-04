import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import Icon from './icon';
import Core from './core';

interface PropsType {
  source: string;
  poster: string;
}

const reactComponent: React.FC<PropsType> = props => {
  const { source, poster } = props;
  const [play, setPlay] = useState(false);

  const changePlay = () => {
    setPlay(!play);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoCon}>
        <Core source={source} poster={poster} play={play}></Core>
        <div className={styles.test}></div>
      </div>
      <div className={styles.danmu}></div>
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
    </div>
  );
};
export default reactComponent;
