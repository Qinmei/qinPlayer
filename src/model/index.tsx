import React, { createContext, useReducer } from 'react';

interface PropsType {
  onStateChange?: (type: string, value: any, state: any) => void;
  initData: any;
  children?: React.ReactNode;
}

interface ContextProps {
  state: DataType;
  dispatch: React.Dispatch<T>;
  methods: MethodsProps;
}

interface DataType {
  source: string;
  poster: string;
  preload: 'auto' | 'metadata' | 'none';
  mode: 'auto' | 'web' | 'h5';
  autoplay: boolean;
  color: string;
  lang: string;
  thumbnail: {
    count: number;
    urls: Array<string>;
  };
  subtitle: string;
  size: number;
  play: boolean;
  loading: boolean;
  duration: number;
  buffered: Array<Array<number>>;
  current: number;
  seeked: number;
  volume: number;
  fullscreen: boolean;
  webscreen: boolean;
  picture: boolean;
  light: boolean;
  movie: boolean;
  message: string;
  rate: number;
  loop: boolean;
  subshow: boolean;
  subsize: number;
  subcolor: number;
  submargin: number;
}

interface MethodsProps {
  changePlay: (value?: boolean) => void;
  changeScreen: (value?: boolean) => void;
  changeMode: (value?: string) => void;
  changeWebScreen: (value?: boolean) => void;
  changeMovie: (value?: boolean) => void;
  changeVolume: (value?: number) => void;
  changeCurrent: (value?: number) => void;
  changeSeeked: (value?: number) => void;
  changeBuffered: (value: Array<Array<number>>) => void;
  changeDuration: (value?: number) => void;
  changeLoading: (value?: boolean) => void;
  changeMessage: (value?: string) => void;
  changePicture: (value?: boolean) => void;
  changeLight: (value?: boolean) => void;
  changeLoop: (value?: boolean) => void;
  changeRate: (value?: number) => void;
  changeSubShow: (value?: boolean) => void;
  changeSubColor: (value?: number) => void;
  changeSubSize: (value?: number) => void;
  changeSubMargin: (value?: number) => void;
  changeSize: (value?: number) => void;
}

const contextValue: ContextProps = {};

const PlayerContext = createContext(contextValue);

const reducer = (state: DataType, action: any) => {
  return {
    ...state,
    ...action,
  };
};

const PlayerProvider = (props: PropsType) => {
  const { onStateChange, children, initData } = props;
  const data: DataType = {
    source: '',
    poster: '',
    preload: 'auto',
    mode: 'web',
    autoplay: false,
    color: '#00a1d6',
    play: false,
    loading: false,
    buffered: [[0, 0]],
    duration: 0.0001,
    current: 0,
    seeked: 0,
    volume: 0.75,
    size: 100,
    fullscreen: false,
    webscreen: false,
    picture: false,
    light: false,
    movie: false,
    rate: 1,
    loop: false,
    subtitle: '',
    subshow: true,
    subsize: 2,
    subcolor: 0,
    submargin: 2,
    message: '',
    lang: 'CN',
    thumbnail: {
      count: 0,
      urls: [],
    },
    ...initData,
  };
  const [state, dispatch] = useReducer(reducer, data);

  const sendData = (type: string, value: any) => {
    dispatch({
      [type]: value,
    });
    onStateChange && onStateChange(type, value, state);
    console.log(type, value);
  };

  // 导出方法给控制栏调用, 改变model的数据状态, 同时回调函数将结果上传
  const methods: MethodsProps = {
    changePlay: (value: boolean = !state.play) => sendData('play', value),
    changeMode: (value: string = 'auto') => sendData('mode', value),
    changeScreen: (value: boolean = !state.fullscreen) => sendData('fullscreen', value),
    changeWebScreen: (value: boolean = !state.webscreen) => sendData('webscreen', value),
    changeMovie: (value: boolean = !state.movie) => sendData('movie', value),
    changeVolume: (value: number = 0.75) =>
      sendData('volume', value > 1 ? 1 : value < 0 ? 0 : value),
    changeCurrent: (value: number = state.current) =>
      sendData('current', value < 0 ? 0 : value > state.duration ? state.duration : value),
    changeSeeked: (value: number = state.seeked) =>
      sendData('seeked', value < 0 ? 0 : value > state.duration ? state.duration : value),
    changeBuffered: (value: Array<Array<number>>) => sendData('buffered', value),
    changeDuration: (value: number = 0) => sendData('duration', value),
    changeLoading: (value: boolean = !state.loading) => sendData('loading', value),
    changeMessage: (value: string = '') => sendData('message', value),
    changePicture: (value: boolean = !state.picture) => sendData('picture', value),
    changeLight: (value: boolean = !state.light) => sendData('light', value),
    changeLoop: (value: boolean = !state.loop) => sendData('loop', value),
    changeRate: (value: number = 1) => sendData('rate', value),
    changeSubShow: (value: boolean = !state.subshow) => sendData('subshow', value),
    changeSubColor: (value: number = state.subcolor) => sendData('subcolor', value),
    changeSubSize: (value: number = state.subsize) => sendData('subsize', value),
    changeSubMargin: (value: number = state.submargin) => sendData('submargin', value),
    changeSize: (value: number = state.size) => sendData('size', value),
  };

  const contextValue: ContextProps = {
    state,
    dispatch,
    methods,
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export { PlayerContext, PlayerProvider };
