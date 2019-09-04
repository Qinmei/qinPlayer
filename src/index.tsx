import React from 'react';
import Core from './core';
import Theme from './theme';

interface PropsType {
  source: string;
  poster: string;
}

const reactComponent: React.FC<PropsType> = props => {
  const { source, poster } = props;
  return <Theme source={source} poster={poster}></Theme>;
};
export default reactComponent;
