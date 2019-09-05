import React from 'react';
import Core from './core';
import Theme from './theme';
import { PlayerProvider } from './model';

interface PropsType {
  source: string;
  poster: string;
  preload?: string;
  autoplay?: Boolean;
  loop?: Boolean;
  theme?: string;
}

const reactComponent: React.FC<PropsType> = props => {
  const {
    source,
    poster = null,
    preload = 'metadata',
    autoplay = false,
    loop = false,
    theme = '#00a1d6',
  } = props;
  return (
    <PlayerProvider>
      <Core
        source={source}
        poster={poster}
        preload={preload}
        autoplay={autoplay}
        loop={loop}
      ></Core>
      <Theme color={theme}></Theme>
    </PlayerProvider>
  );
};
export default reactComponent;
