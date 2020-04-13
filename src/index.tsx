import React from 'react';
import Core from './core';
import Sub from './subtitle';
import Danmu, { DanmuText } from './danmu';
import WebTheme from './theme/web/theme';
import { PlayerProvider, DataType } from './model';
import '@babel/polyfill';

interface PropsType {
  source: string;
  poster?: string;
  preload?: string;
  autoplay?: boolean;
  color?: string;
  subtitle?: string;
  danmu?: string;
  danmuFront?: (res: any) => DanmuText[];
  danmuBack?: (value: DanmuText) => Promise<boolean>;
  onStateChange?: (type: string, value: any, state: DataType) => void;
}

const reactComponent: React.FC<PropsType> = (props) => {
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
