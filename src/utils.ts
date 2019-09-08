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
