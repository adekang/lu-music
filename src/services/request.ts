import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { environmentVariable } from "@/utils";

const isPrd = environmentVariable() === "dev";

// http://121.41.42.16:3000
// http://www.codeman.ink/api
export const baseUrl = isPrd ? "http://121.41.42.16:3000" : "https://vue-music-trtst-com.vercel.app";

// // axios 的实例及拦截器配置
// const request = axios.create({
//   baseURL: baseUrl,
//   timeout: 5000
// });
//
// // 请求拦截
// request.interceptors.response.use(
//   config => {
//     const token = window.localStorage.getItem("token") || window.sessionStorage.getItem("token");
//     config.data = { ...config.data, token };
//     config.headers = {
//       "Content-Type": "application/json"
//     };
//     // 序列化
//     // config.data = QS.stringify(config.data)
//
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
//
// // 响应拦截器
// request.interceptors.response.use(
//   response => {
//     // 根据返回不同的状态码做不同的事情
//     // 这里一定要和后台开发人员协商好统一的错误状态码
//     if (response.status) {
//       switch (response.status) {
//         case 200:
//           return response;
//         case 401:
//           // 未登录处理方法
//           break;
//         case 403:
//           // token过期处理方法
//           break;
//         default:
//           console.log(response.data.msg);
//       }
//     } else {
//       return response;
//     }
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
//
// /**
//  * get请求
//  * @param {*} url     请求地址
//  * @param {*} params
//  */
// export function get<T = never, R = AxiosResponse<T>>(
//   url: string,
//   params: AxiosRequestConfig<T>
// ): Promise<R> {
//   return service.get(url, {
//     params
//   });
// }
//
// /**
//  * post请求
//  * @param {*} url     请求地址
//  * @param {*} data
//  */
// export function post(url: string, data: unknown) {
//   return service.post(url, data);
// }
//
// /**
//  * put请求
//  * @param {*} url     请求地址
//  * @param {*} data
//  */
// export function put(url: string, data: unknown) {
//   return service.put(url, data);
// }

/**
 * delete请求
 * @param {*} url
 */
export function del(url: string) {
  return service.delete(url);
}

// 最后把封装好的axios导出
// export { request };



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createRequest from "./createRequest.js";

const service = createRequest({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
  responseStatusMap: {},
  headers: {
    // 'X-SERVICE-GROUP': getCookie(cookieKey)
    "Content-Type": "application/json"
  }
});

export default service;
