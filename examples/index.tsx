import React from 'react';
import { render } from 'react-dom';
import Player from '../src/index';
const App = () => (
  <Player
    source="http://video.qinvideo.org/video.mp4"
    poster="https://qinvideo.org/video.jpg"
    subtitle="http://video.qinvideo.org/sub.vtt"
  />
);
render(<App />, document.getElementById('root'));
