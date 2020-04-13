import { DataType } from './index';

type SendData = (type: string, value: any) => void;

export class Methods {
  constructor(private state: DataType, private sendData: SendData) {}

  changePlay = (value: boolean = !this.state.play) => this.sendData('play', value);
  changeMode = (value: string = 'auto') => this.sendData('mode', value);
  changeScreen = (value: boolean = !this.state.fullscreen) => this.sendData('fullscreen', value);
  changeWebScreen = (value: boolean = !this.state.webscreen) => this.sendData('webscreen', value);
  changeMovie = (value: boolean = !this.state.movie) => this.sendData('movie', value);
  changeVolume = (value: number = 0.75) =>
    this.sendData('volume', value > 1 ? 1 : value < 0 ? 0 : value);
  changeCurrent = (value: number = this.state.current) =>
    this.sendData(
      'current',
      value < 0 ? 0 : value > this.state.duration ? this.state.duration : value,
    );
  changeSeeked = (value: number = this.state.seeked) =>
    this.sendData(
      'seeked',
      value < 0 ? 0 : value > this.state.duration ? this.state.duration : value,
    );
  changeBuffered = (value: Array<Array<number>>) => this.sendData('buffered', value);
  changeDuration = (value: number = 0) => this.sendData('duration', value);
  changeLoading = (value: boolean = !this.state.loading) => this.sendData('loading', value);
  changeMessage = (value: string = '') => this.sendData('message', value);
  changePicture = (value: boolean = !this.state.picture) => this.sendData('picture', value);
  changeLight = (value: boolean = !this.state.light) => this.sendData('light', value);
  changeLoop = (value: boolean = !this.state.loop) => this.sendData('loop', value);
  changeRate = (value: number = 1) => this.sendData('rate', value);
  changeSubShow = (value: boolean = !this.state.subshow) => this.sendData('subshow', value);
  changeSubColor = (value: number = this.state.subcolor) => this.sendData('subcolor', value);
  changeSubSize = (value: number = this.state.subsize) => this.sendData('subsize', value);
  changeSubMargin = (value: number = this.state.submargin) => this.sendData('submargin', value);
  changeSize = (value: number = this.state.size) => this.sendData('size', value);
  changeDanmuShow = (value: boolean = !this.state.danmuShow) => this.sendData('danmuShow', value);
  changeNoTop = (value: boolean = !this.state.noTop) => this.sendData('noTop', value);
  changeNoBottom = (value: boolean = !this.state.noBottom) => this.sendData('noBottom', value);
  changeNoScroll = (value: boolean = !this.state.noScroll) => this.sendData('noScroll', value);
  changeDanmuOpacity = (value: number = this.state.danmuOpacity) =>
    this.sendData('danmuOpacity', value);
  changeDanmuArea = (value: number = this.state.danmuArea) => this.sendData('danmuArea', value);
  changeDanmuFont = (value: number = this.state.danmuFont) => this.sendData('danmuFont', value);
}
