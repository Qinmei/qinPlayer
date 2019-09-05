import React, { useEffect, useRef, useContext } from 'react';
import styles from './style.less';
import { PlayerContext } from './model';

interface PropsType {
  source: string;
  poster: string;
  preload?: string;
  autoplay?: Boolean;
  loop?: Boolean;
}

const reactComponent: React.FC<PropsType> = props => {
  const { source, poster, preload, autoplay, loop } = props;
  const videoRef: any = useRef(null);

  const data: any = useContext(PlayerContext);
  const {
    state: { play, current, volume, fullscreen, movie },
  } = data;

  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  useEffect(() => {
    videoRef.current.currentTime = current;
  }, [current]);

  // useEffect(() => {
  //   console.log(fullscreen);
  //   if (fullscreen) {
  //     videoRef.current.webkitRequestFullScreen();
  //   } else {
  //     document.webkitCancelFullScreen();
  //   }
  // }, [fullscreen]);

  return (
    <video
      className={styles.video}
      src={source}
      poster={poster}
      preload={preload}
      autoPlay={autoplay}
      loop={loop}
      webkit-playsinline
      controls={false}
      onLoadStart={e => console.log(e)}
      ref={videoRef}
    ></video>
  );
};
export default reactComponent;
