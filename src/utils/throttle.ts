type ThrottleFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T> | void;

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ThrottleFunction<T> => {
  let inThrottle = false;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
    if (!inThrottle) {
      const result = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      return result;
    }
  };
};
