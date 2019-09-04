import React, { useEffect, useRef, useContext } from 'react';
import styles from './index.less';
import { PlayerContext } from './model';

interface PropsType {
  source: string;
  poster: string;
}

const reactComponent: React.FC<PropsType> = props => {
  const { source, poster = null } = props;

  const data: any = useContext(PlayerContext);
  const { state, dispatch } = data;

  const videoRef: any = useRef(null);

  useEffect(() => {
    if (state.play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [state.play]);

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
