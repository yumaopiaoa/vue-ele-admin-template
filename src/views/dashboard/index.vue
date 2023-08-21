<template>
  <div class="app-container">
    <el-card>
      <el-button @click="message('我是一个按钮', 'info')">按钮</el-button>
      <el-button @click="message('我是一个按钮', 'info')" type="primary"
        >按钮</el-button
      >
      <el-button @click="message('我是一个按钮', 'success')" type="success"
        >按钮</el-button
      >
      <el-button @click="message('我是一个按钮', 'info')" type="info"
        >按钮</el-button
      >
      <el-button @click="message('我是一个按钮', 'warning')" type="warning"
        >按钮</el-button
      >
      <el-button @click="message('我是一个按钮', 'error')" type="danger"
        >按钮</el-button
      >
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "",
    };
  },
  created() {
    
  },
  methods: {
    message(msg, type) {
      this.$message[type](msg);
    },
  },
};
</script>
<style></style>
