let timer;

export const scrollToSmoothly = function () {
  let start;

  return function (targetX, targetY, duration = 300) {
    const self = this === window ? window : undefined;

    const offsetX = self.pageXOffset;
    const offsetY = self.pageYOffset;
    const deltaX  = targetX - offsetX;
    const deltaY  = targetY - offsetY;

    start = Date.now();

    if (timer) {
      self.clearInterval(timer);
    }

    function step() {
      let x;
      let y;

      let factor = (Date.now() - start) / duration;
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
}();

export const scrollToElementSmoothly = function () {
  const STEP_DURATION = 10;
  let start;

  return function (elem, extraOffset = 0, duration = 300) {
    const self = this === window ? window : undefined;

    if (!elem) {
      return;
    }

    if (timer) {
      self.clearInterval(timer);
    }

    const targetElem = elem;
    start = Date.now();

    function step() {
      const remainingTargetOffset =
        targetElem.getBoundingClientRect().top - extraOffset;

      const remainingTime = duration - (Date.now() - start);
      if(remainingTime < 0) {
        self.clearInterval(timer);
        self.scrollBy(0, remainingTargetOffset);
      } else {
        const needScrollBy =
          remainingTargetOffset * STEP_DURATION / remainingTime;
        self.scrollBy(0, needScrollBy);
      }
    }

    timer = self.setInterval(step, STEP_DURATION);
    return timer;
  };
}();
