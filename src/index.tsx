import React from 'react';
import Core from './core';
import Theme from './theme';
import { PlayerProvider } from './model';

interface PropsType {
  source: string;
  poster: string;
}

const reactComponent: React.FC<PropsType> = props => {
  const { source, poster } = props;
  return (
    <PlayerProvider>
      <Theme>
        <Core source={source} poster={poster}></Core>
      </Theme>
    </PlayerProvider>
  );
};
export default reactComponent;
