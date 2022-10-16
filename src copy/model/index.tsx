import React, { createContext, useReducer } from 'react';
import { Methods } from './methods';
import { DanmuText } from '../danmu';
import { getMode } from '../utils/utils';

export interface IndexPropsType {
  source: {
    label: string;
    value: string;
  }[];
  poster?: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  color?: string;
  subtitle?: string;
  danmu?: string;
  danmuFront?: (res: any) => DanmuText[];
  danmuBack?: (value: DanmuText) => Promise<boolean>;
  onStateChange?: (type: string, value: any, state: DataType) => void;
  mode?: 'web' | 'mobile';
}

interface PropsType {
  onStateChange?: (type: string, value: any, state: any) => void;
  initData: IndexPropsType;
  children?: React.ReactNode;
}

interface ContextProps {
  state: DataType;
  dispatch: React.Dispatch<any>;
  methods: Methods;
}

export interface SourceType {
  label: string;
  value: string;
}

export interface DataType {
  source: SourceType[];
  playSource: string;
  poster: string;
  preload: 'auto' | 'metadata' | 'none';
  mode: 'web' | 'mobile';
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
  danmu: string;
  danmuShow: boolean;
  noTop: boolean;
  noBottom: boolean;
  noScroll: boolean;
  danmuOpacity: number;
  danmuArea: number;
  danmuFont: number;
  danmuFront?: (res: any) => DanmuText[];
}

const PlayerContext = createContext({} as ContextProps);

const reducer = (state: DataType, action: any) => {
  return {
    ...state,
    ...action,
  };
};

const PlayerProvider = (props: PropsType) => {
  const { onStateChange, children, initData } = props;

  const data: DataType = {
    source: [],
    playSource: (initData.source && initData.source[0] && initData.source[0].value) || '',
    poster: '',
    preload: 'auto',
    mode: initData.mode ? initData.mode : getMode(),
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
    danmu: '',
    noTop: false,
    noBottom: false,
    noScroll: false,
    danmuShow: true,
    danmuOpacity: 4,
    danmuArea: 2,
    danmuFont: 2,
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
  };

  const contextValue: ContextProps = {
    state,
    dispatch,
    methods: new Methods(state, sendData),
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export { PlayerContext, PlayerProvider };
