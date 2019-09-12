import React from 'react';
import { render } from 'react-dom';
import Player from '../src/index';
const App = () => (
  <Player
    source="https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
    poster="https://qinvideo.org/video.jpg"
    subtitle="http://video.qinvideo.org/sub.vtt"
  />
);
render(<App />, document.getElementById('root'));
