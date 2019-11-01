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

export const getStyleName = (styles: any, type: string, prefix: any) => {
  const total: string = type + '-' + prefix;
  console.log(total);
  return styles[total];
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
  web: ['40px', '50px', '60px', '70px', '80px'],
  h5: [],
};

export const sizeArr: any = {
  web: ['25px', '30px', '35px', '40px', '45px'],
  h5: [],
};
