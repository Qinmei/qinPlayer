import React from 'react';
import Core from './core';
import Theme from './theme';
import { PlayerProvider } from './model';

interface PropsType {
  source: string;
  poster: string;
  preload?: string;
  autoplay?: boolean;
  loop?: boolean;
  theme?: string;
  onStateChange?: (type: string, value: any) => void;
}

const reactComponent: React.FC<PropsType> = props => {
  const {
    source,
    poster = '',
    preload = 'metadata',
    autoplay = false,
    loop = false,
    theme = '#00a1d6',
    onStateChange = (type: string, value: any) => {},
  } = props;
  return (
    <PlayerProvider onStateChange={onStateChange}>
      <Core
        source={source}
        poster={poster}
        preload={preload}
        autoplay={autoplay}
        loop={loop}
      >
        <Theme color={theme}></Theme>
      </Core>
    </PlayerProvider>
  );
};
export default reactComponent;
