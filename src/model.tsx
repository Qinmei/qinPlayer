import React, { createContext, useReducer } from 'react';

interface PropsType {
  onStateChange: (type: string, value: any, state: any) => void;
  children?: React.ReactNode;
}

interface DataType {
  play?: Boolean;
  loading?: boolean;
  duration?: number;
  buffered?: Array<Array<number>>;
  current?: number;
  seeked?: number;
  volume?: number;
  fullscreen?: Boolean;
  movie?: Boolean;
  message?: string;
}

const data: DataType = {
  play: false,
  loading: false,
  buffered: [[0, 0]],
  duration: 175,
  current: 0,
  seeked: 0,
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

  const sendData = (type: string, value: any) => {
    dispatch({
      [type]: value,
    });
    onStateChange(type, value, state);
  };

  // 导出方法给控制栏调用, 改变model的数据状态, 同时回调函数将结果上传
  const methods = {
    changePlay: (value: boolean = !state.play) => sendData('play', value),
    changeScreen: (value: boolean = !state.fullscreen) => sendData('fullscreen', value),
    changeMovie: (value: boolean = !state.movie) => sendData('movie', value),
    changeVolume: (value: number = 0.75) => sendData('volume', value),
    changeCurrent: (value: number = state.current) => sendData('current', value),
    changeSeeked: (value: number = state.seeked) => sendData('seeked', value),
    changeBuffered: (value: number = 0) => sendData('buffered', value),
    changeDuration: (value: number = 0) => sendData('duration', value),
    changeloading: (value: boolean = !state.loading) => sendData('loading', value),
    changeMessage: (value: string = '') => sendData('message', value),
  };

  return (
    <PlayerContext.Provider value={{ state, dispatch, methods }}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
