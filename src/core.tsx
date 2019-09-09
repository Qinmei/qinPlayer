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
    state: { play, current, volume, fullscreen, movie, seeked, picture },
    methods,
  } = data;

  const onMethods = {
    onDurationChange: (e: any) => {
      const { duration } = e.target;
      methods.changeDuration(duration);
    },
    onTimeUpdate: (e: any) => {
      const { currentTime } = e.target;
      methods.changeCurrent(currentTime);
    },
    onProgress: (e: any) => {
      const { buffered } = e.target;
      const length = buffered.length;
      const arr = [...Array(length).keys()];
      const buffer = arr.map((item: any) => [buffered.start(item), buffered.end(item)]);
      methods.changeBuffered(buffer);
    },
    onWaiting: () => {
      methods.changeLoading(true);
    },
    onCanPlay: () => {
      methods.changeLoading(false);
    },
  };

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
    videoRef.current.currentTime = seeked;
  }, [seeked]);

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

  // 画中画

  useEffect(() => {
    if (picture) {
      videoRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  }, [picture]);

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
        // onLoadStart={e => console.log(e)}
        // onError={e => console.log(e)}
        onDurationChange={onMethods.onDurationChange}
        onProgress={onMethods.onProgress}
        onTimeUpdate={onMethods.onTimeUpdate}
        // onSuspend={onMethods.onSuspend}
        onWaiting={onMethods.onWaiting}
        onCanPlay={onMethods.onCanPlay}
        // onSeeked={e => console.log(e)}
        ref={videoRef}
      ></video>
      {children}
    </div>
  );
};
export default reactComponent;
