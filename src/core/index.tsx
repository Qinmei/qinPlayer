import React, { useEffect, useRef, useContext } from 'react';
import { PlayerContext } from '../model';
import { getStyleName } from '../utils/utils';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .video {
    width: 100%;
    background-position: center;
    background-size: cover;
    background-color: black;

    &::-webkit-media-controls {
      display: none !important;
    }

    &::cue {
      background-color: transparent;
      font-size: ${props => props.size};
      line-height: ${props => props.height};
      color: ${props => props.color};
    }
  }
`;

interface PropsType {
  children: any;
}

const reactComponent: React.FC<PropsType> = props => {
  const { children } = props;
  const playerRef: any = useRef(null);
  const videoRef: any = useRef(null);

  const data = useContext(PlayerContext);
  const {
    state: {
      source,
      poster,
      preload,
      autoplay,
      subtitle,
      play,
      volume,
      fullscreen,
      seeked,
      picture,
      rate,
      loop,
      subshow,
      subcolor,
      subsize,
      submargin,
    },
    methods,
  } = data;

  const onMethods = {
    onPlaying: () => {
      methods.changePlay(true);
    },

    onPause: () => {
      methods.changePlay(false);
    },

    onDurationChange: (e: any) => {
      const { duration } = e.target;
      methods.changeDuration(duration);
    },
    onTimeUpdate: (e: any) => {
      const { currentTime } = e.target;
      methods.changeCurrent(currentTime);
    },
    onProgress: (e: any) => {
      const { buffered } = e.target;
      const length = buffered.length;
      const arr = [...Array(length).keys()];
      const buffer = arr.map((item: any) => [buffered.start(item), buffered.end(item)]);
      methods.changeBuffered(buffer);
    },
    onWaiting: () => {
      methods.changeLoading(true);
    },
    onCanPlay: () => {
      methods.changeLoading(false);
    },
  };

  // 播放
  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  // 进度条
  useEffect(() => {
    videoRef.current.currentTime = seeked;
  }, [seeked]);

  // 音量
  useEffect(() => {
    videoRef.current.volume = volume;
  }, [volume]);

  // 速率
  useEffect(() => {
    videoRef.current.playbackRate = rate;
  }, [rate]);

  // 全屏
  useEffect(() => {
    if (fullscreen) {
      playerRef.current.webkitRequestFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }
  }, [fullscreen]);

  // 画中画

  useEffect(() => {
    if (picture) {
      videoRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  }, [picture]);

  return (
    <Wrapper ref={playerRef} color={subcolor} size={subsize} height={submargin}>
      <video
        crossOrigin="anonymous"
        className="video"
        src={source}
        poster={poster}
        preload={preload}
        autoPlay={autoplay}
        loop={loop}
        controls={false}
        onPlaying={onMethods.onPlaying}
        onPause={onMethods.onPause}
        onDurationChange={onMethods.onDurationChange}
        onProgress={onMethods.onProgress}
        onTimeUpdate={onMethods.onTimeUpdate}
        onWaiting={onMethods.onWaiting}
        onCanPlay={onMethods.onCanPlay}
        //
        // 其他事件
        onAbort={() => {}}
        onCanPlayThrough={() => {}}
        onEmptied={() => {}}
        onEncrypted={() => {}}
        onEnded={() => {}}
        onError={() => {}}
        onLoadedData={() => {}}
        onLoadedMetadata={() => {}}
        onLoadStart={() => {}}
        onPlay={() => {}}
        onRateChange={() => {}}
        onSeeked={() => {}}
        onSeeking={() => {}}
        onStalled={() => {}}
        onSuspend={() => {}}
        onVolumeChange={() => {}}
        ref={videoRef}
      >
        {subshow && <track kind="subtitles" default src={subtitle}></track>}
      </video>
      {children}
    </Wrapper>
  );
};
export default reactComponent;
