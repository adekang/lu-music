import axios from "axios";
import QS from "qs";
import { environmentVariable } from "@/utils";

const isPrd = environmentVariable() === "dev";

export const baseUrl = isPrd ? "http://121.41.42.16:3000" : "http://localhost:3000";

// axios 的实例及拦截器配置
const service = axios.create({
  baseURL: baseUrl,
});

// 请求拦截
service.interceptors.response.use(
  (config) => {
    const token = window.localStorage.getItem("token") || window.sessionStorage.getItem("token");
    config.data = { ...config.data, token };
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    };
    config.data = QS.stringify(config.data);

    return config;
  },
  (error) => error,
);

// 响应拦截器
service.interceptors.response.use((response) => {
  // 根据返回不同的状态码做不同的事情
  // 这里一定要和后台开发人员协商好统一的错误状态码
  if (response.code) {
    switch (response.code) {
      case 200:
        return response.data;
      case 401:
        // 未登录处理方法
        break;
      case 403:
        // token过期处理方法
        break;
      default:
        console.log(response.data.msg);
    }
  } else {
    return response;
  }
});
// 最后把封装好的axios导出
export default service;
