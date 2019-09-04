import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';

interface PropsType {
  source: string;
  poster: string;
  play?: Boolean;
  current?: Number;
  volume?: Number;
  fullscreen?: Boolean;
  movie?: Boolean;
}

const reactComponent: React.FC<PropsType> = props => {
  const {
    source,
    poster = null,
    play = false,
    current = 0,
    volume = 0.75,
    fullscreen = false,
    movie = false,
  } = props;

  const videoRef: any = useRef(null);

  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  return (
    <video
      className={styles.video}
      src={source}
      poster={poster}
      onLoadStart={e => console.log(e)}
      ref={videoRef}
    ></video>
  );
};
export default reactComponent;
