import React, { createContext, useReducer } from 'react';

interface PropsType {
  onStateChange: (type: string, value: any) => void;
  children?: React.ReactNode;
}

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
  message: '',
};
const PlayerContext = createContext(data);

const reducer = (state: DataType, action: any) => {
  return {
    ...state,
    ...action,
  };
};

const PlayerProvider = (props: PropsType) => {
  const { onStateChange, children } = props;
  const [state, dispatch] = useReducer(reducer, data);

  // 导出方法给控制栏调用, 改变model的数据状态, 同时回调函数将结果上传
  const methods = {
    changePlay: () => {
      dispatch({
        play: !state.play,
      });
      onStateChange('play', !state.play);
    },
    changeScreen: () => {
      dispatch({
        fullscreen: !state.fullscreen,
      });
      onStateChange('fullscreen', !state.fullscreen);
    },
    changeMovie: () => {
      dispatch({
        movie: !state.movie,
      });
      onStateChange('movie', !state.movie);
    },
    changeVolume: (value: number) => {
      dispatch({
        volume: value,
      });
      onStateChange('volume', value);
    },
    changeMessage: (msg: string) => {
      dispatch({
        message: msg,
      });
      onStateChange('message', msg);
    },
  };

  return (
    <PlayerContext.Provider value={{ state, dispatch, methods }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
