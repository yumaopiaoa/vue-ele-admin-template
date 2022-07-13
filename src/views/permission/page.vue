<template>
  <div class="app-container">
    亲爱的{{$store.getters.roles[0]}}你有权看到这个页面
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from "./components/SwitchRoles";
export default {
  name: "PagePermission",
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: "/permission/index?" + +new Date() });
    },
  },
};
</script>
