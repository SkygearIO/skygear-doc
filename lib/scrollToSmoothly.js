let timer;
let start;
let factor;

export default function(targetX, targetY, duration) {
  const self = this === undefined ? this : window;

  let offsetX = self.pageXOffset;
  let offsetY = self.pageYOffset;
  let deltaX  = targetX - offsetX;
  let deltaY  = targetY - offsetY;

  duration = duration || 500;
  start = Date.now();
  factor = 0;

  if (timer) {
    self.clearInterval(timer);
  }

  function step() {
    let x;
    let y;

    factor = (Date.now() - start) / duration;
    if(factor >= 1) {
      self.clearInterval(timer);
      factor = 1;
    }

    x = factor * deltaX + offsetX;
    y = factor * deltaY + offsetY;
    self.scrollBy(
      x - self.pageXOffset,
      y - self.pageYOffset
      );
  }

  timer = self.setInterval(step, 10);
  return timer;
};
