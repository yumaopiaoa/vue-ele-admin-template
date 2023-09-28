<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="tokenForm" class="demo-form-inline">
        <el-form-item label="appid">
          <el-input v-model="tokenForm.appid" placeholder="公众号appid"></el-input>
        </el-form-item>
        <el-form-item label="secret">
          <el-input v-model="tokenForm.secret" placeholder="公众号secret"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">获取</el-button>
        </el-form-item>
      </el-form>
      <div class="mb6">accessToken有效时间为两小时,超过两小时需重新获取，否则调用微信其他接口会失败</div>
      <div>当前accessToken: {{ access_token }}</div>
    </el-card>
  </div>
</template>

<script>
import mpRequest from "@/utils/mpRequest";

export default {
  data() {
    return {
      tokenForm: {
        appid: "wx09826cd8f0c50414",
        secret: "f20ed45d04c99c664b16838bf4f1623c",
      },
      access_token: localStorage.getItem("mpAccessToken"),
    };
  },
  methods: {
    onSubmit() {
      mpRequest({
        url: "/stable_token",
        method: "POST",
        data: {
          grant_type: "client_credential",
          appid: this.tokenForm.appid,
          secret: this.tokenForm.secret,
        },
      }).then((res) => {
        const { access_token } = res;
        this.access_token = access_token;
        localStorage.setItem("mpAccessToken", access_token);
      });
    },
  },
};
</script>

<style></style>
