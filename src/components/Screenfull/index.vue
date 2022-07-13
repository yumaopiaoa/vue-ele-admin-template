<template>
  <div @click="click" class="screenfull">
    <i class="screenfull-icon iconfont" :class="isFullscreen?'icon-quxiaoquanping_o':'icon-fullscreen'"></i>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", () => {
          this.isFullscreen = screenfull.isFullscreen;
        });
      }
    },
  },
};
</script>

<style scoped>
.screenfull-icon {
  color: #fff;
  font-size: 20px;
}
</style>
