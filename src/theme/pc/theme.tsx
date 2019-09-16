import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './style.less';
import { PlayerContext } from '../../model';
import Subtitle from '../components/subtitle';
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

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const togglePlay = () => {
    methods.changePlay();
  };

  return (
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
              <Subtitle></Subtitle>
              <Setting></Setting>
              <WebScreen></WebScreen>
              <FullScreen></FullScreen>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reactComponent;
