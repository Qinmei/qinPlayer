import React, { useContext, useRef } from 'react';
import screenfull from 'screenfull';
import styles from './style.less';
import { PlayerContext } from '../../model';
import Subtitle from '../components/subtitle';
import Danmu from '../components/danmu';
import Volume from '../components/volume';
import Setting from '../components/setting';
import WebScreen from '../components/webscreen';
import FullScreen from '../components/fullscreen';
import Play from '../components/play';
import Duration from '../components/duration';
import Message from '../components/message';
import Loading from '../components/loading';
import Progress from '../components/progress';

const reactComponent: React.FC<{}> = props => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { webscreen, light } = state;
  const { children } = props;

  const playerRef: React.RefObject<T> = useRef(undefined);

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const togglePlay = () => {
    methods.changePlay();
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerRef.current);
    }
  };

  return (
    <div
      ref={playerRef}
      className={`${styles.qinplayer} ${webscreen && styles.webscreen} ${light && styles.nolight}`}
    >
      <div className={styles.control} onClick={togglePlay}>
        <Message></Message>
        <Loading></Loading>
        <div
          className={`${styles.bar} ${state.play ? styles.play : styles.pause}`}
          onClick={preventDefault}
        >
          <div className={styles.content}>
            <Progress></Progress>
            <div className={styles.option}>
              <div className={styles.left}>
                <Play></Play>
                <Duration></Duration>
              </div>
              <div className={styles.right}>
                <Volume></Volume>
                {state.subtitle && <Subtitle></Subtitle>}
                <Setting></Setting>
                <WebScreen></WebScreen>
                <FullScreen onChange={toggleFullscreen}></FullScreen>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
export default reactComponent;
