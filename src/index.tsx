import React from 'react';
import Core from './core';
import Sub from './subtitle';
import Danmu, { DanmuText } from './danmu';
import Theme from './theme';
import { PlayerProvider, IndexPropsType } from './model';
import '@babel/polyfill';

const reactComponent: React.FC<IndexPropsType> = (props) => {
  const { onStateChange, children, ...args } = props;

  return (
    <PlayerProvider onStateChange={onStateChange} initData={args}>
      <Theme fullNode={children}>
        <Danmu></Danmu>
        <Sub></Sub>
        <Core></Core>
      </Theme>
    </PlayerProvider>
  );
};
export default reactComponent;
