import React from 'react';
import Core from './core';
import Sub from './subtitle';
import WebTheme from './theme/web/theme';
import { PlayerProvider } from './model';

interface PropsType {
  source: string;
  poster?: string;
  preload?: string;
  autoplay?: boolean;
  color?: string;
  subtitle?: string;
  onStateChange?: (type: string, value: any, state: any) => void;
}

const reactComponent: React.FC<PropsType> = props => {
  const { onStateChange, ...args } = props;

  return (
    <PlayerProvider onStateChange={onStateChange} initData={args}>
      <WebTheme>
        <Sub></Sub>
        <Core></Core>
      </WebTheme>
    </PlayerProvider>
  );
};
export default reactComponent;
