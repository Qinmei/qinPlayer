export const enterFullscreen = (ref: any) => {
  if (ref.requestFullscreen) {
    console.log('1');
    ref.requestFullscreen();
  } else if (ref.mozRequestFullScreen) {
    console.log('2');
    ref.mozRequestFullScreen();
  } else if (ref.webkitRequestFullscreen) {
    console.log('3');
    ref.webkitRequestFullscreen();
  } else if (ref.webkitEnterFullscreen) {
    console.log('4');
    // Safari for iOS
    ref.webkitEnterFullscreen();
  } else if (ref.webkitEnterFullScreen) {
    console.log('5');
    ref.webkitEnterFullScreen();
  } else if (ref.msRequestFullscreen) {
    console.log('6');
    ref.msRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.webkitCancelFullscreen) {
    document.webkitCancelFullscreen();
  } else if (document.msCancelFullScreen) {
    document.msCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};
