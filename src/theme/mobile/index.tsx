import React, { useState, useContext, useRef, useEffect } from 'react';
import screenfull from 'screenfull';
import styles from './style.less';
import { PlayerContext } from '../../model';
import Subtitle from '../components/subtitle-mobile';
import Danmu from '../components/danmu-mobile';
import FullScreen from '../components/fullscreen-mobile';
import Play from '../components/play';
import Duration from '../components/duration';
import Message from '../components/message';
import Loading from '../components/loading';
import Progress from '../components/progress';
import Source from '../components/source-mobile';
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
  const [clickTime, setClickTime] = useState<number>(0);

  const playerRef = useRef<HTMLElement>({} as HTMLElement);
  const infoRef = useRef<InformationRefAll>({} as InformationRefAll);
  const timeRef = useRef<number>(0);

  const preventDefault = (e: React.MouseEvent) => {
    hideControl(6000);
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerRef.current);
    }
  };

  const hideControl = (time = 3000) => {
    setVisible(true);
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    if (!play) return;

    timeRef.current = setTimeout(() => {
      setVisible(false);
    }, time);
  };

  const toggleControl = () => {
    if (!play) {
      methods.changePlay();
    } else {
      if (doubleClick()) {
        methods.changePlay();
        return;
      }
    }
    if (visible) {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      setVisible(false);
    } else {
      hideControl();
    }
  };

  const doubleClick = () => {
    const now = new Date().getTime();
    if (now - clickTime < 300) {
      setClickTime(0);
      return true;
    }
    setClickTime(now);
    return false;
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
    >
      <div className={styles.control} onClick={toggleControl}>
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
                  {source.length > 0 && <Source></Source>}
                  {state.subtitle && <Subtitle></Subtitle>}
                  {state.danmu && <Danmu></Danmu>}
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
