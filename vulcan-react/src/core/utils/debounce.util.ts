export const debounce = (cb: any, timer: number) => {
  let timeout: any;
  return (...args: any) => {
    // @ts-ignore
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => cb.apply(context, args), timer);
  };
};
