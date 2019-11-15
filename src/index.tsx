import React from 'react';
import Core from './core';
import Sub from './subtitle';
import Danmu from './danmu';
import WebTheme from './theme/web/theme';
import { PlayerProvider } from './model';
import '@babel/polyfill';

interface PropsType {
  source: string;
  poster?: string;
  preload?: string;
  autoplay?: boolean;
  color?: string;
  subtitle?: string;
  danmu?: string;
  onStateChange?: (type: string, value: any, state: any) => void;
}

const reactComponent: React.FC<PropsType> = props => {
  const { onStateChange, ...args } = props;

  return (
    <PlayerProvider onStateChange={onStateChange} initData={args}>
      <WebTheme>
        <Danmu></Danmu>
        <Sub></Sub>
        <Core></Core>
      </WebTheme>
    </PlayerProvider>
  );
};
export default reactComponent;
