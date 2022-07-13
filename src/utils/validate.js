// 验证用户名
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 手机格式验证
export const checkMobile = (mobile) => {
  let reg = /^1[345678]\d{9}$/
  return reg.test(mobile)
}

// 密码格式验证
export const checkPassword = (password) => {
  let reg = /^\w{6,12}$/
  return reg.test(password)
}
