export default window.requestAnimationFrame || function requestAnimationFrame (cb) {
  setTimeout(cb, 0);
};
