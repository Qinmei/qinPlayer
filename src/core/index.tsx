/**
 * @params 属性
 * audioTracks        : 返回一个表示可用音轨的AudioTrackList对象
 * autoplay           : 设置或返回视频是否应该在加载后立即开始播放
 * buffered           : 返回一个TimeRanges对象，表示视频的缓冲部分
 * controller         : 返回MediaController对象，表示视频的当前媒体控制器
 * crossOrigin        : 设置或返回视频的CORS设置
 * controls           : 设置或返回视频是否显示控件(如播放/暂停等)
 * currentSrc         : 返回当前视频的URL
 * currentTime        : 设置或返回视频中的当前回放位置(以秒为单位)
 * defaultMuted       : 设置或返回视频是否应该在默认情况下保持静音
 * defaultPlaybackRate: 设置或返回视频播放的默认速度
 * duration           : 返回当前视频的长度(以秒为单位)
 * ended              : 返回视频播放是否结束
 * error              : 返回一个MediaError对象，表示视频的错误状态
 * loop               : 设置或返回视频结束后是否应重新开始
 * mediaGroup         : 设置或返回视频所属的组(用于链接多个视频元素)
 * muted              : 设置或返回视频是否静音
 * networkState       : 返回视频的当前网络状态
 * paused             : 返回视频是否暂停
 * playbackRate       : 设置或返回视频播放的速度
 * played             : 返回一个TimeRanges对象，表示视频的播放部分
 * preload            : 设置或返回页面加载时是否加载视频
 * readyState         : 返回视频的当前就绪状态
 * seekable           : 返回一个TimeRanges对象，该对象表示视频的可查找部分
 * seeking            : 返回用户当前是否在视频中搜索
 * src                : 设置或返回视频元素的当前源
 * startDate          : 返回表示当前时间偏移量的日期对象
 * textTracks         : 返回一个表示可用文本轨迹的TextTrackList对象
 * videoTracks        : 返回一个表示可用视频轨道的VideoTrackList对象
 * volume             : 设置或返回视频的音量
 */

/**
 * @params 事件
 * onLoadStart     : 在浏览器开始寻找指定视频触发。
 * onDurationChange: 在视频的时长发生变化时触发。
 * onLoadedMetadata: 在指定视频的元数据加载后触发。视频的元数据包含: 时长，尺寸大小（视频），文本轨道
 * onLoadedData    : 在当前帧的数据加载完成且还没有足够的数据播放视频的下一帧时触发。
 * onProgress      : 在浏览器下载指定的视频时触发。
 * onCanPlay       : 在用户可以开始播放视频时触发。
 * onCanPlayThrough: 在视频可以正常播放且无需停顿和缓冲时触发。
 * onPlaying       : 在视频暂停或者在缓冲后准备重新开始播放时触发。
 * onPause         : 在视频暂停时触发。
 * onTimeUpdate    : 在视频当前的播放位置发送改变时触发。
 * onWaiting       : 在视频由于要播放下一帧而需要缓冲时触发。
 * onEmptied       : 当前播放列表为空时触发
 * onEncrypted     : 在发生encrypted事件时触发，表示媒体已加密
 * onEnded         : 在视频播放结束时触发。
 * onError         : 在视频数据加载期间发生错误时触发。
 * onPlay          : 在视频开始播放时触发。
 * onRateChange    : 速率变化
 * onSeeked        : 事件在用户重新定位视频的播放位置后触发。
 * onSeeking       : 在用户开始重新定位视频时触发。
 * onAbort         : 该事件在多媒体数据终止加载时触发，而不是发生错误时触发。
 * onStalled       : 在浏览器获取媒体数据，但媒体数据不可用时触发。
 * onSuspend       : 读取媒体数据中断
 * onVolumeChange  : 音量改变
 */

/**
 * @params 在加载过程中，触发的顺序如下：
 * onloadstart
 * ondurationchange
 * onloadedmetadata
 * onloadeddata
 * onprogress
 * oncanplay
 * oncanplaythrough
 */

import React, { useState, useEffect, useRef, useContext } from 'react';
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

const reactComponent = () => {
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const addonRef = useRef<number>(0);

  const [fail, setFail] = useState<boolean>(false);

  const data = useContext(PlayerContext);
  const {
    state: {
      playSource,
      poster,
      preload,
      autoplay,
      play,
      volume,
      seeked,
      picture,
      rate,
      loop,
      size,
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

    onTimeUpdate: (e: React.ChangeEvent<HTMLVideoElement>) => {
      const { currentTime } = e.target;
      methods.changeCurrent(currentTime);
    },

    onSeeked: (e: React.ChangeEvent<HTMLVideoElement>) => {
      const { readyState } = e.target;
      if (readyState > 2) {
        if (addonRef.current) {
          clearTimeout(addonRef.current);
        }
        methods.changeLoading(false);
      }
    },
    onSeeking: () => {
      if (addonRef.current) {
        clearTimeout(addonRef.current);
      }
      addonRef.current = setTimeout(() => {
        methods.changeLoading(true);
      }, 300);
    },

    onProgress: (e: React.ChangeEvent<HTMLVideoElement>) => {
      const { buffered } = e.target;
      const length = buffered.length;
      const arr = [...Array(length).keys()];
      const buffer = arr.map((item: any) => [buffered.start(item), buffered.end(item)]);
      methods.changeBuffered(buffer);
    },
    onWaiting: () => {
      methods.changeLoading(true);
    },
    onLoadStart: () => {
      methods.changeMessage('9视频初始化');
    },
    onDurationChange: (e: React.ChangeEvent<HTMLVideoElement>) => {
      const { duration } = e.target;
      methods.changeDuration(duration);
      methods.changeMessage('9获取视频信息');
    },
    onLoadedMetadata: () => {
      methods.changeMessage('9开始加载视频');
    },
    onLoadedData: () => {
      methods.changeMessage('1准备播放视频');
    },
    onCanPlay: () => {
      methods.changeLoading(false);
    },
    onCanPlayThrough: () => {}, // 体验更好, 但是需要更完美的配合, 感觉没必要
    onEncrypted: () => {
      methods.changeMessage('9视频文件已被加密');
      setFail(true);
    },
    onEnded: () => {
      console.log('onEnded');
    },
    onError: (e: React.ChangeEvent<HTMLVideoElement>) => {
      const { error } = e.target;
      const type: { [propName: number]: string } = {
        1: '请求中止无法获取资源',
        2: '获取视频时发生错误',
        3: '视频解码错误',
        4: '不支持的视频类型或文件',
      };
      if (error) {
        methods.changeMessage(`9${type[error.code]}`);
        setFail(true);
      }
    },
    onEmptied: () => {}, // 切换视频时会触发, 暂时用不上
    onAbort: () => {}, // 没触发过
    onStalled: () => {}, // 中间有一部分加载失败会触发
    onSuspend: () => {}, // 缓存了一段数据就会触发
    onPlay: () => {}, // 切换成播放状态的时候会触发, 用处不大
    onRateChange: () => {},
    onVolumeChange: () => {},
  };

  // 播放
  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  // 播放连接
  useEffect(() => {
    videoRef.current.src = playSource;
    videoRef.current.currentTime = seeked;
  }, [playSource]);

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

  useEffect(() => {
    methods.changeLoading(false);
  }, [fail]);

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
        src={playSource}
        poster={poster}
        preload={preload}
        autoPlay={autoplay}
        loop={loop}
        controls={false}
        onLoadStart={onMethods.onLoadStart}
        onDurationChange={onMethods.onDurationChange}
        onLoadedMetadata={onMethods.onLoadedMetadata}
        onLoadedData={onMethods.onLoadedData}
        onProgress={onMethods.onProgress}
        onCanPlay={onMethods.onCanPlay}
        onCanPlayThrough={onMethods.onCanPlayThrough}
        onPlaying={onMethods.onPlaying}
        onPause={onMethods.onPause}
        onTimeUpdate={onMethods.onTimeUpdate}
        onWaiting={onMethods.onWaiting}
        onEmptied={onMethods.onEmptied}
        onEncrypted={onMethods.onEncrypted}
        onEnded={onMethods.onEnded}
        onError={onMethods.onError}
        onPlay={onMethods.onPlay}
        onRateChange={onMethods.onRateChange}
        onSeeked={onMethods.onSeeked}
        onSeeking={onMethods.onSeeking}
        onAbort={onMethods.onAbort}
        onStalled={onMethods.onStalled}
        onSuspend={onMethods.onSuspend}
        onVolumeChange={onMethods.onVolumeChange}
        ref={videoRef}
      ></video>
    </Wrapper>
  );
};
export default reactComponent;
