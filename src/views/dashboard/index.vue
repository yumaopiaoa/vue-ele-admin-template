<template>
  <div class="app-container">

  </div>
</template>

<script>
export default {
  data() {
    return {
      type: ''
    }
  },
  methods: {
    jumpTo(){
      this.$router.push({
        path: '/list/index'
      })
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>

