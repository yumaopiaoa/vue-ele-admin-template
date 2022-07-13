import request from "@/utils/request";

export function loginByUsername(name, password, code) {
  const data = {
    name,
    password,
    code
  };
  return Promise.resolve({
    code: 200,
    data: {
      token: "123456"
    }
  });
}

export function getUserInfo() {
  return Promise.resolve({
    code: 200,
    data: {
      name:"admin",
      avatar: ""
    }
  })
}
