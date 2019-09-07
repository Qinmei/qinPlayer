import React, { useEffect, useRef, useContext } from 'react';
import styles from './style.less';
import { PlayerContext } from './model';

interface PropsType {
  source: string;
  poster: string;
  preload?: string;
  autoplay?: boolean;
  loop?: boolean;
  children: any;
}

const reactComponent: React.FC<PropsType> = props => {
  const { source, poster, preload, autoplay, loop, children } = props;
  const playerRef: any = useRef(null);
  const videoRef: any = useRef(null);

  const data: any = useContext(PlayerContext);
  const {
    state: { play, current, volume, fullscreen, movie },
  } = data;

  // 播放
  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  // 进度条
  useEffect(() => {
    videoRef.current.currentTime = current;
  }, [current]);

  // 音量
  useEffect(() => {
    videoRef.current.volume = volume;
  }, [volume]);

  // 全屏
  useEffect(() => {
    if (fullscreen) {
      playerRef.current.webkitRequestFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }
  }, [fullscreen]);

  return (
    <div className={styles.wrapper} ref={playerRef}>
      <video
        className={styles.video}
        src={source}
        poster={poster}
        preload={preload}
        autoPlay={autoplay}
        loop={loop}
        controls={false}
        onLoadStart={e => console.log(e)}
        ref={videoRef}
      ></video>
      {children}
    </div>
  );
};
export default reactComponent;
