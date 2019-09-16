import React from 'react';
import Core from './core';
import WebTheme from './theme/web/theme';
import { PlayerProvider } from './model';

interface PropsType {
  source: string;
  poster?: string;
  preload?: string;
  autoplay?: boolean;
  color?: string;
  subtitle?: string;
  onStateChange?: (type: string, value: any) => void;
}

const reactComponent: React.FC<PropsType> = props => {
  const { onStateChange = (type: string, value: any, state: any) => {}, ...args } = props;

  return (
    <PlayerProvider onStateChange={onStateChange} initData={args}>
      <Core>
        <WebTheme />
      </Core>
    </PlayerProvider>
  );
};
export default reactComponent;
