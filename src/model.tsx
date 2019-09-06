import React, { createContext, useReducer, useEffect, useRef } from 'react';
import styles from './style.less';

interface DataType {
  play?: Boolean;
  current?: Number;
  volume?: Number;
  fullscreen?: Boolean;
  movie?: Boolean;
  message?: string;
}

const data: DataType = {
  play: false,
  current: 0,
  volume: 0.75,
  fullscreen: false,
  movie: false,
  message: '加载错误',
};
const PlayerContext = createContext(data);

const reducer = (state: DataType, action: any) => {
  return {
    ...state,
    ...action,
  };
};

const PlayerProvider = (props: any) => {
  const playerRef: any = useRef(null);
  const [state, dispatch] = useReducer(reducer, data);
  const { fullscreen } = state;

  const methods = {
    changePlay: () => {
      dispatch({
        play: !state.play,
      });
    },
    changeScreen: () => {
      dispatch({
        fullscreen: !state.fullscreen,
      });
    },
    changeVolume: (value: number) => {
      dispatch({
        volume: value,
      });
    },
  };

  useEffect(() => {
    if (fullscreen) {
      playerRef.current.webkitRequestFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }
  }, [fullscreen]);

  return (
    <PlayerContext.Provider value={{ state, dispatch, methods }}>
      <div className={styles.wrapper} ref={playerRef}>
        {props.children}
      </div>
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
