<template>
  <div class="errPage-container">
    <el-button
      icon="arrow-left"
      class="pan-back-btn"
      @click="back"
    >返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">ERROR!</h1>
        <h2>你没有访问该页面的权限</h2>
        <h6>如有不满请联系你的领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以:</li>
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="那个女孩把冰欺凌掉了"
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "Page401",
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
