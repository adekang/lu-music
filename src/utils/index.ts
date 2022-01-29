/**
 * @description node运行环境
 * @return "dev" | "prod"
 */
export const environmentVariable = () => {
  const env = import.meta.env.VITE_APP_ANT;
  let parps = null;
  switch (env) {
    case "dev": // 开发环境下
      parps = "dev";
      break;
    case "prod": // 正式生产环境下
      parps = "prod";
      break;
    default:
      parps = "dev";
      break;
  }
  return parps;
};

export const debounce = function (func: any, delay: number): any {
  let timer: number | undefined;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};
