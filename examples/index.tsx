import React from 'react';
import { render } from 'react-dom';
import Player from '../src/index';
const App = () => (
  <Player
    source={[
      { label: '高清', value: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4' },
      {
        label: '超清',
        value: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
      },
    ]}
    poster="https://qinvideo.org/video.jpg"
    subtitle="https://qinvideo.org/videos/subtitle.vtt"
    danmu="https://demo.qinvideo.org/api/v1/danmu/list?id=test"
    onStateChange={(type: string, value: any, state: any) => {}}
  >
    弹幕区
  </Player>
);
render(<App />, document.getElementById('root'));
