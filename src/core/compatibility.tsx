export const enterFullscreen = (ref: any) => {
  if (ref.requestFullscreen) {
    ref.requestFullscreen();
  } else if (ref.mozRequestFullScreen) {
    ref.mozRequestFullScreen();
  } else if (ref.webkitRequestFullscreen) {
    ref.webkitRequestFullscreen();
  } else if (ref.webkitEnterFullscreen) {
    // Safari for iOS
    ref.webkitEnterFullscreen();
  } else if (ref.webkitEnterFullScreen) {
    ref.webkitEnterFullScreen();
  } else if (ref.msRequestFullscreen) {
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
