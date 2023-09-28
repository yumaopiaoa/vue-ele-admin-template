import axios from "axios";
import {
  Message,
} from "element-ui";
import store from "@/store";
// import router from "@/router";
import {
  getToken
} from "@/utils/auth";

let base_url;
if (process.env.NODE_ENV === "production") {
  base_url = "/";
} else if (process.env.NODE_ENV === "development") {
  base_url = "/api";
}
// create an axios instance
const service = axios.create({
  baseURL: base_url, // api 的 base_url
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (store.state.user.token) {
      // 让每个请求携带token--
      config.headers["token"] = getToken();
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
  // (response) => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   */
  (response) => {
    const res = response.data;
    return res
    // if (res.code !== 200) {
    //   // 502 token错误或者已退出
    //   if (res.code === 502) {
    //     return response;
    //   } else if (res.code === 501) {
    //     // 501Token 过期了;
    //     MessageBox.confirm(
    //       res.message || "你已被登出，可以取消继续留在该页面，或者重新登录",
    //       "token验证失效", {
    //       confirmButtonText: "重新登录",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }
    //     )
    //       .then(() => {
    //         store.dispatch("LogOut").then(() => {
    //           location.reload(); // 为了重新实例化vue-router对象 避免bug
    //         });
    //       })
    //       .catch(() => { });
    //   } else {
    //     Message({
    //       message: res.message,
    //       type: "error",
    //       duration: 5 * 1000,
    //     });
    //   }
    //   return Promise.reject("error");

    // } else {
    //   return response;
    // }
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