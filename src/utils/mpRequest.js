import axios from "axios";
import { Message } from "element-ui";

let base_url = "/mp";

// create an axios instance
const service = axios.create({
  baseURL: base_url, // api 的 base_url
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (config.url != "/stable_token") {
      // 让每个请求携带token--
      if (config.url.includes("?")) {
        config.url += "&access_token=" + localStorage.getItem("mpAccessToken");
      } else {
        config.url += "?access_token=" + localStorage.getItem("mpAccessToken");
      }
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(res);
    if (res.errcode) {
      Message({
        message: res.errmsg,
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject("error");
    } else {
      return res;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
