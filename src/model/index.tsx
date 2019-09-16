import React, { createContext, useReducer } from 'react';

interface PropsType {
  onStateChange: (type: string, value: any, state: any) => void;
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
  autoplay: boolean;
  color: string;
  lang: string;
  thumbnail: {
    count: number;
    urls: Array<string>;
  };
  subtitle: string;

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
  subsize: string;
  subcolor: string;
  submargin: string;
}

interface MethodsProps {
  changePlay: (value?: boolean) => void;
  changeScreen: (value?: boolean) => void;
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
  changeSubtitle: (value?: boolean) => void;
  changeSubColor: (value?: string) => void;
  changeSubSize: (value?: string) => void;
  changeSubMargin: (value?: string) => void;
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
    preload: 'metadata',
    autoplay: false,
    color: '#00a1d6',
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
    light: false,
    movie: false,
    rate: 1,
    loop: false,
    subtitle: '',
    subshow: false,
    subsize: '36px',
    subcolor: 'white',
    submargin: '100px',
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
    ...initData,
  };
  const [state, dispatch] = useReducer(reducer, data);

  const sendData = (type: string, value: any) => {
    dispatch({
      [type]: value,
    });
    onStateChange(type, value, state);
    console.log(type, value);
  };

  // 导出方法给控制栏调用, 改变model的数据状态, 同时回调函数将结果上传
  const methods: MethodsProps = {
    changePlay: (value: boolean = !state.play) => sendData('play', value),
    changeScreen: (value: boolean = !state.fullscreen) => sendData('fullscreen', value),
    changeWebScreen: (value: boolean = !state.webscreen) => sendData('webscreen', value),
    changeMovie: (value: boolean = !state.movie) => sendData('movie', value),
    changeVolume: (value: number = 0.75) => sendData('volume', value),
    changeCurrent: (value: number = state.current) => sendData('current', value),
    changeSeeked: (value: number = state.seeked) => sendData('seeked', value),
    changeBuffered: (value: Array<Array<number>>) => sendData('buffered', value),
    changeDuration: (value: number = 0) => sendData('duration', value),
    changeLoading: (value: boolean = !state.loading) => sendData('loading', value),
    changeMessage: (value: string = '') => sendData('message', value),
    changePicture: (value: boolean = !state.picture) => sendData('picture', value),
    changeLight: (value: boolean = !state.light) => sendData('light', value),
    changeLoop: (value: boolean = !state.loop) => sendData('loop', value),
    changeRate: (value: number = 1) => sendData('rate', value),
    changeSubtitle: (value: boolean = !state.subtitle) => sendData('subtitle', value),
    changeSubColor: (value: string = state.subcolor) => sendData('subcolor', value),
    changeSubSize: (value: string = state.subsize) => sendData('subsize', value),
    changeSubMargin: (value: string = state.submargin) => sendData('submargin', value),
  };

  const contextValue: ContextProps = {
    state,
    dispatch,
    methods,
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export { PlayerContext, PlayerProvider };
