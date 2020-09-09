// @ts-ignore
export const throttle = (fn: any, threshhold = 250, scope = this) => {
  let last: any;
  let deferTimer: any;

  return (...args: any) => {
    const now = Date.now();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(scope, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(scope, args);
    }
  };
};
