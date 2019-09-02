import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import Icon from './icon';

const reactComponent: React.FC = props => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log(videoRef.current);
    videoRef.current.currentTime = 180;
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.videoCon}>
        <video
          className={styles.video}
          src="https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
          onLoadStart={e => console.log(e)}
          ref={videoRef}
        ></video>
        <div className={styles.test}></div>
      </div>
      <div className={styles.danmu}></div>
      <div className={styles.control}>
        <div className={styles.bar}>
          <div className={styles.left}>
            <div className={styles.icon}>
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
              <Icon type="fullscreen" className={styles.iconfont}></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reactComponent;
