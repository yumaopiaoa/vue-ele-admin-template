<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class='breadcrumb-container'>
      <Breadcrumb />
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <screenfull class="right-menu-item hover-effect" />
      </template>
      
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span class="user-name">{{userInfo.name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="logout"
            icon="el-icon-switch-button"
          >
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  data() {
    return {
    };
  },
  components: {
    Hamburger,
    Screenfull,
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["sidebar", "userInfo", "device"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        this.$message.success("退出成功");
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.navbar {
  height: 50px;
  background: rgba(0, 0, 0, 0.85);
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    fill: #fff;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 12px;
      height: 100%;
      vertical-align: text-bottom;
      color: #fff;
      .clear-cache-icon {
        font-size: 24px;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;
      .avatar-wrapper {
        position: relative;
        padding-right: 10px;
        .user-name {
          font-size: 12px;
          color: #fff;
          display: inline-block;
        }
        .el-icon-caret-bottom {
          color: #fff;
          cursor: pointer;
          position: absolute;
          right: -5px;
          top: 19px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
