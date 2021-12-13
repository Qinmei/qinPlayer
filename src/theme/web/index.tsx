import React, { useState, useContext, useRef, useEffect } from 'react';
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
import Source from '../components/source';
import Information, { InformationRefAll } from '../components/information';

interface PropType {
  fullNode?: React.ReactNode;
}

const reactComponent: React.FC<PropType> = (props) => {
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { webscreen, light, source, play, fullscreen } = state;
  const { children, fullNode } = props;

  const [visible, setVisible] = useState<boolean>(true);

  const playerRef = useRef<HTMLElement>({} as HTMLElement);
  const infoRef = useRef<InformationRefAll>({} as InformationRefAll);
  const timeRef = useRef<number>(0);

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

  const onKeyPress = (e: React.KeyboardEvent) => {
    switch (e.keyCode) {
      case 32: // space
        methods.changePlay();
        break;
      case 37: // left
        methods.changeSeeked(state.current - 15);
        infoRef.current.init('backward');
        break;
      case 38: // up
        methods.changeVolume(state.volume + 0.05);
        infoRef.current.init('volume');
        break;
      case 39: // right
        methods.changeSeeked(state.current + 15);
        infoRef.current.init('forward');
        break;
      case 40: // down
        methods.changeVolume(state.volume - 0.05);
        infoRef.current.init('volume');
        break;
      default:
        break;
    }
  };

  const hideControl = () => {
    setVisible(true);
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    if (!play) return;

    timeRef.current = setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  useEffect(() => {
    if (play) {
      hideControl();
    } else {
      setVisible(true);
    }
  }, [play]);

  return (
    <div
      ref={playerRef}
      className={`${styles.qinplayer} ${webscreen && styles.webscreen} ${light && styles.nolight} ${
        !visible && styles.novisible
      }`}
      tabIndex={-1}
      onKeyDown={onKeyPress}
      onMouseMove={hideControl}
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
    >
      <div className={styles.control} onClick={togglePlay}>
        <Message></Message>
        <Loading></Loading>
        <Information ref={infoRef}></Information>
        {(visible || !play) && (
          <div className={styles.bar} onClick={preventDefault}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
              <Progress></Progress>
              <div className={styles.option}>
                <div className={styles.left}>
                  <Play></Play>
                  <Duration></Duration>
                </div>
                <div className={styles.middle}>{(fullscreen || webscreen) && fullNode}</div>
                <div className={styles.right}>
                  <Volume></Volume>
                  {source.length > 0 && <Source></Source>}
                  {state.subtitle && <Subtitle></Subtitle>}
                  {state.danmu && <Danmu></Danmu>}
                  <Setting></Setting>
                  <WebScreen></WebScreen>
                  <FullScreen onChange={toggleFullscreen}></FullScreen>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
export default reactComponent;
