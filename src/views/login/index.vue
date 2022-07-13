<template>
  <div class="login-container">
    <div class="login-form">
      <div class="form-wrap">
        <el-form
          class="login-box"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="form-icon">
              <i class="el-icon-user"></i>
            </span>
            <el-divider direction="vertical"></el-divider>

            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="form-icon">
              <i class="el-icon-lock"></i>
            </span>
            <el-divider direction="vertical"></el-divider>
            <el-input
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                class="view-pass"
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-form-item prop="code">
            <span class="form-icon">
              <i class="el-icon-chat-dot-square"></i>
            </span>
            <el-divider direction="vertical"></el-divider>
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <!-- <img :src="codeUrl" alt="" /> -->
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 25px; height: 48px"
            @click.native.prevent="handleLogin"
          >
            立即登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "17665340764",
        password: "123456",
        code: "1234",
      },
      codeUrl: "",
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
    };
  },
  computed: {},
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;

              this.$router
                .push({
                  // path: this.redirect || "/",
                  path: "/",
                })
                .catch(() => {});
              setTimeout(() => {
                this.$message.success("欢迎回来");
              }, 300);
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #fff;
$light_gray: #888;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 84%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 12px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #dddddd;
    background: $bg;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background: #f0f0f0;
  overflow: hidden;
  .login-form {
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0,0,0, 0.2);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 856px;
    height: 525px;
    max-width: 100%;
    overflow: hidden;
    border-radius: 10px;
    
    .form-wrap {
      width: 270px;
      position: absolute;
      right: 85px;
      top: 50%;
      transform: translateY(-50%);
      .log-title {
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 40px;
        color: #1890ff;
      }
    }

    .svg-icon:not(.view-pass) {
      width: 1.8em;
      height: 1.8em;
    }
  }

  .form-icon {
    padding-left: 10px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    font-size: 18px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 14px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    .svg-icon{
      width: 1.2em;
      height: 1.2em;
    }
  }
}
</style>
