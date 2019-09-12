import React, { createContext, useReducer } from 'react';

interface PropsType {
  onStateChange: (type: string, value: any, state: any) => void;
  children?: React.ReactNode;
}

interface DataType {
  play?: boolean;
  loading?: boolean;
  duration?: number;
  buffered?: Array<Array<number>>;
  current?: number;
  seeked?: number;
  volume?: number;
  fullscreen?: boolean;
  webscreen?: boolean;
  picture?: boolean;
  light?: boolean;
  movie?: boolean;
  message?: string;
  rate?: number;
  loop: boolean;
  lang?: string;
  thumbnail?: {
    count: number;
    urls: Array<string>;
  };
  subtitle?: boolean;
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
  webscreen: false,
  picture: false,
  light: true,
  movie: false,
  rate: 1,
  loop: false,
  subtitle: true,
  message: '',
  lang: 'CN',
  thumbnail: {
    count: 300,
    urls: [
      'https://i0.hdslb.com/bfs/videoshot/7539894-1.jpg',
      'https://i0.hdslb.com/bfs/videoshot/7539894-2.jpg',
      'https://i0.hdslb.com/bfs/videoshot/7539894-3.jpg',
    ],
  },
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
    console.log(type, value);
  };

  // 导出方法给控制栏调用, 改变model的数据状态, 同时回调函数将结果上传
  const methods = {
    changePlay: (value: boolean = !state.play) => sendData('play', value),
    changeScreen: (value: boolean = !state.fullscreen) => sendData('fullscreen', value),
    changeWebScreen: (value: boolean = !state.webscreen) => sendData('webscreen', value),
    changeMovie: (value: boolean = !state.movie) => sendData('movie', value),
    changeVolume: (value: number = 0.75) => sendData('volume', value),
    changeCurrent: (value: number = state.current) => sendData('current', value),
    changeSeeked: (value: number = state.seeked) => sendData('seeked', value),
    changeBuffered: (value: number = 0) => sendData('buffered', value),
    changeDuration: (value: number = 0) => sendData('duration', value),
    changeLoading: (value: boolean = !state.loading) => sendData('loading', value),
    changeMessage: (value: string = '') => sendData('message', value),
    changePicture: (value: boolean = !state.picture) => sendData('picture', value),
    changeLight: (value: boolean = !state.light) => sendData('light', value),
    changeLoop: (value: boolean = !state.loop) => sendData('loop', value),
    changeRate: (value: number = 1) => sendData('rate', value),
    changeSubtitle: (value: boolean = !state.subtitle) => sendData('subtitle', value),
  };

  return (
    <PlayerContext.Provider value={{ state, dispatch, methods }}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
