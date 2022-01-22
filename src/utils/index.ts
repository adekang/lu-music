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
