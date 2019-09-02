import React, { useEffect, useRef } from 'react';
import styles from './index.module.less';

const reactComponent: React.FC = props => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log(videoRef.current);
  });
  return (
    <video
      className={styles.video}
      src="https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
      onLoadStart={e => console.log(e)}
      ref={videoRef}
    ></video>
  );
};
export default reactComponent;
