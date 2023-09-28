<template>
  <div id="wx-tools-user">
    <el-card>
      <el-table :data="wxUserData">
        <el-table-column prop="openid" label="openid"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import mpRequest from "@/utils/mpRequest";

export default {
  data() {
    return {
      wxUserData: [],
    };
  },
  created() {
    this.getWxUserData();
  },
  methods: {
    async getWxUserData() {
      const userData = await mpRequest({ url: "/user/get" });
      this.wxUserData = userData.data.openid.map((item) => {
        return {
          openid: item,
        };
      });
    },
  },
};
</script>

<style></style>
