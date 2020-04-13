import React, { useEffect, useRef, useContext } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${(props: { percent: any }) => props.percent}%;
  height: ${(props: { percent: any }) => props.percent}%;
  display: flex;
  justify-content: center;
  align-items: center;

  .video {
    width: 100%;
    max-height: 100%;
    background-position: center;
    background-size: cover;
    background-color: black;

    &::-webkit-media-controls {
      display: none !important;
    }
  }
`;

interface PropsType {}

const reactComponent: React.FC<PropsType> = (props) => {
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);

  const data = useContext(PlayerContext);
  const {
    state: { source, poster, preload, autoplay, play, volume, seeked, picture, rate, loop, size },
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

  // 画中画
  useEffect(() => {
    if (!document.pictureInPictureEnabled) return;
    if (picture) {
      videoRef.current.requestPictureInPicture();
    } else {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    }
  }, [picture]);

  return (
    <Wrapper percent={size}>
      <video
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
      ></video>
    </Wrapper>
  );
};
export default reactComponent;
