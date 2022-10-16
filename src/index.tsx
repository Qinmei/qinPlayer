import React, { useState } from 'react';
import { Core } from './core';
import { Player } from './core/video';

interface PropsType {
  options: any;
}
const QinPlayer: React.FC<PropsType> = props => {
  const { options } = props;

  const [player] = useState(() => new Player(options))

  return (
    // <Theme>
    //   <Danmu></Danmu>
    //   <Sub></Sub>
    <Core player={player}></Core>
    // </Theme>
  );
};


const App = () => {
  return <QinPlayer options={{ source: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4' }}></QinPlayer>
}

export default App;