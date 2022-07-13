import {
  loginByUsername,
  getUserInfo,
} from "@/api/login";
import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";
import {
  setStore,
  getStore,
  removeStore
} from "@/utils/store";

const user = {
  state: {
    userInfo: getStore({
      name: "sell_user_info"
    }) || {},
    token: getToken(),
    roles: [],
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_INFO(state, userinfo) {
      state.userInfo = userinfo;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const name = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(name, userInfo.password, userInfo.code)
          .then((response) => {
            const token = response.data.token;
            commit("SET_TOKEN", token);
            setToken(token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then((response) => {
            if (response.code !== 200) {
              reject(response.data || "验证失败，请再一次尝试");
            }

            const data = response.data;
            const roles = ['admin'];

            if (roles && roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit("SET_ROLES", roles);
            } else {
              reject("验证返回的roles必须是一个非空数组");
            }

            commit("SET_USER_INFO", data);
            setStore({
              name: "sell_user_info",
              content: data
            });
            resolve(response);

          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit("SET_USER_INFO", null);
        removeToken();
        removeStore({
          name: "sell_user_info"
        });
        resolve();

      });
    },
  },
};

export default user;