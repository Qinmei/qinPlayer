import { Store } from '@yuanjs/common'
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

/**
 * 记录属性：
 * duration：视频的播放进度
 * status: 'loading' | 'seeking'
 * seeked,
 * picture,
 * rate,
 * loop,
 */

enum MediaStatus {
  Initing,
  Playing,
  Seeking,
  Paused,
  Ended,
  Error,
}

interface PlayerOptions {
  source: string;
  rate?: number;
  poster?: string;
  preload?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}

interface StateType {
  source: string;
  rate: number;
  poster: string;
  preload: boolean;
  autoplay: boolean;
  loop: boolean;

  status: MediaStatus;
  duration: number;
  currentTime: number;
  message: string;
  buffered: number[][];
}

export class Player {
  public store: Store<StateType>;

  constructor(
    options: PlayerOptions,
  ) {
    this.store = new Store({
      status: MediaStatus.Initing,
      duration: 0,
      currentTime: 0,
      message: '',
      buffered: [],
      ...options,
    } as StateType)
  }

  private setState = <K extends keyof StateType>(key: K, value: StateType[K]) => {
    this.store.setState({
      [key]: value
    })
  }

  onPlaying = () => {
    this.setState('status', MediaStatus.Playing);
  };

  onPause = () => {
    this.setState('status', MediaStatus.Paused);
  };

  onTimeUpdate = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const { currentTime } = e.target;
    this.setState('currentTime', currentTime);
  };

  onSeeked = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const { readyState } = e.target;
    if (readyState > 2) {
      this.setState('status', MediaStatus.Playing);
    }
  };
  onSeeking = () => {
    this.setState('status', MediaStatus.Seeking);
  };

  onProgress = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const { buffered } = e.target;
    const length = buffered.length;
    const arr = [...Array(length).keys()];
    const buffer = arr.map((item: number) => [buffered.start(item), buffered.end(item)]);
    this.setState('buffered', buffer);
  };
  onWaiting = () => {
    this.setState('status', MediaStatus.Seeking);
  };
  onLoadStart = () => {
    this.setState('message', '视频初始化');
  };
  onDurationChange = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const { duration } = e.target;
    this.setState('duration', duration);
    this.setState('message', '获取视频信息');
  };
  onLoadedMetadata = () => {
    this.setState('message', '开始加载视频');
  };
  onLoadedData = () => {
    this.setState('message', '准备播放视频');
  };
  onCanPlay = () => {
    this.setState('status', MediaStatus.Playing);
  };
  onCanPlayThrough = () => { };
  onEncrypted = () => { };
  onEnded = () => {
    console.log('onEnded');
  };
  onError = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const { error } = e.target;
    const type: { [propName: number]: string } = {
      1: '请求中止无法获取资源',
      2: '获取视频时发生错误',
      3: '视频解码错误',
      4: '不支持的视频类型或文件',
    };
    if (error) {
      this.setState('message', type[error.code]);
    }
  };
  onEmptied = () => { };
  onAbort = () => { };
  onStalled = () => { };
  onSuspend = () => { };
  onPlay = () => { };
  onRateChange = () => { };
  onVolumeChange = () => { };
}
