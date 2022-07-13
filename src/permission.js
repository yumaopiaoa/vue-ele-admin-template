import router from "./router";
import store from "./store";
import {
  Message
} from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
  getToken
} from "@/utils/auth";

NProgress.configure({
  showSpinner: false
});

const whiteList = ["/login", "/auth-redirect"]; // 白名单

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) {
    // 确定是否有token
    /* has token*/
    if (to.path === "/login") {
      next({
        path: "/"
      });
      NProgress.done(); // 如果当前页面是dashboard，那么在每个钩子之后都不会触发，所以手动处理它
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetUserInfo")
          .then(() => {
            // 拉取user_info
            const roles = ["admin"]; // 注意：角色必须是数组！
            store.dispatch("GenerateRoutes", {
              roles
            }).then(() => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({
                ...to,
                replace: true
              }); // hack方法 确保addRoutes已完成 ,设置replace:true，这样导航就不会留下历史记录
            });
          })
          .catch((err) => {
            store.dispatch("LogOut").then(() => {
              Message.error(err);
              // 502 token错误或者已退出
              next({
                path: "/"
              });
            });
          });
      } else {
        next();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done(); // 如果当前页面为login，则每次钩子后都不会触发，所以手动处理它
    }
  }
});

router.afterEach(() => {
  let dom = document.querySelector(".main-scroll-bar .el-scrollbar__wrap");
  if (dom) dom.scrollTop = 0;

  NProgress.done(); // 处理完成
});