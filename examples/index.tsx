import React from 'react';
import { render } from 'react-dom';
import Player from '../src/index';
const App = () => (
  <Player
    source={[
      { label: '高清', value: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4' },
      {
        label: '超清',
        value: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
      },
    ]}
    poster="https://qinvideo.org/video.jpg"
    subtitle="https://qinvideo.org/sub.vtt"
    danmu="https://demo.qinvideo.org/api/v1/danmu/list?id=test"
    onStateChange={(type: string, value: any, state: any) => {}}
  />
);
render(<App />, document.getElementById('root'));
