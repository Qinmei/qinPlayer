export const timeTransfer = (time: number) => {
  if (time > 3600) {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time - hour * 3600) / 60);
    const seconds = Math.floor(time - 3600 * hour - 60 * minute);
    return `${numFixTwo(hour)}:${numFixTwo(minute)}:${numFixTwo(seconds)}`;
  } else {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time - 60 * minute);
    return `${numFixTwo(minute)}:${numFixTwo(seconds)}`;
  }
};

export const numFixTwo = (num: number) => {
  return num > 9 ? num : `0${num}`;
};

export const getMode = () => {
  const agent = navigator.userAgent;
  if (/Android|iPhone|webOS|BlackBerry|SymbianOS|Windows Phone|iPad|iPod/.test(agent)) {
    return 'mobile';
  }
  return 'web';
};

export const getStyleName = (styles: any, type: string, prefix: any) => {
  const total: string = type + '-' + prefix;
  return styles[total];
};

export const getFontLength = (text: string) => {
  const Alllength = text.length;
  const TotalLength = text.replace(/[^\x00-\xff]/g, '01').length;
  const CNlength = TotalLength - Alllength;
  const ENlength = TotalLength - CNlength * 2;
  const length = CNlength * 2 + (ENlength * 6) / 5;
  return length;
};

export const colorArr: Array<string> = [
  'black',
  '#ff0000',
  '#ff7d00',
  '#ffff00',
  '#00ff00',
  '#0000ff',
  '#00ffff',
  '#ff00ff',
];

export const marginArr: any = {
  web: ['20px', '35px', '50px', '65px', '80px'],
  mobile: ['14px', '18px', '22px', '26px', '30px'],
};

export const sizeArr: any = {
  web: ['25px', '30px', '35px', '40px', '45px'],
  mobile: ['12px', '14px', '16px', '18px', '20px'],
};

export const areaArr: any = {
  web: ['0.25', '0.5', '0.67', '0.75', '1'],
  mobile: ['0.25', '0.5', '0.67', '0.75', '1'],
};

export const fontArr: any = {
  web: [12, 16, 18, 20, 24],
  mobile: [12, 16, 18, 20, 24],
};

export const opacityArr: any = {
  web: [0.2, 0.4, 0.6, 0.8, 1],
  mobile: [0.2, 0.4, 0.6, 0.8, 1],
};
