import React, { useEffect, useRef, useContext } from 'react';
import styles from './style.less';
import { PlayerContext } from './model';
import { url } from 'inspector';

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
      poster={'qinvideo'}
      onLoadStart={e => console.log(e)}
      ref={videoRef}
      style={{ backgroundImage: `url(${poster})` }}
    ></video>
  );
};
export default reactComponent;
