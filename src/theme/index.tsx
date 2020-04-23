import React, { useEffect, useContext, useState } from 'react';
import { PlayerContext } from '../model';
import WebTheme from './web';
import MobileTheme from './mobile';

interface PropsTypes {
  fullNode: React.ReactNode;
}

const reactComponent: React.FC<PropsTypes> = (props) => {
  const { fullNode, children } = props;
  const data = useContext(PlayerContext);
  const {
    state: { mode },
  } = data;

  let CustomTheme = WebTheme;
  if (mode === 'mobile') {
    CustomTheme = MobileTheme;
  }

  return <CustomTheme fullNode={fullNode}>{children}</CustomTheme>;
};
export default reactComponent;
