import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout/Layout";

Vue.use(Router);
/**
* hidden: true                   如果true`将不显示在侧边栏中（默认为false）
* alwaysShow: true               如果设置为true，则无论其子级路由的长度如何，将始终显示根菜单
*                                如果不设置alwaysShow，则只有多条路线下的子项
*                                它将变成嵌套模式，否则不显示根菜单
* redirect: noredirect           如果`redirect：noredirect`将不会在面包屑中重定向
* name:'router-name'             名称由<keep alive>使用（必须设置！！！）
* meta : {
    roles: ['admin','editor']    将控制页面角色（您可以设置多个角色）
    title: 'title'               名称显示在子菜单和面包屑中
    icon: 'svg-name'             图标名称
    noCache: true                如果为true，则不会缓存页面（默认为false）
    breadcrumb: false            如果为false，则该项将隐藏在面包屑中（默认为true）
    affix: true                  如果为true，则标签将粘贴在标签视图中(不可关闭)
  }
**/

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [{
      path: "dashboard",
      component: () => import("@/views/dashboard/index"),
      name: "Dashboard",
      meta: {
        title: "首页",
        icon: "el-icon-odometer",
        noCache: true,
        affix: true,
      },
    },],
  },
  {
    path: "/list",
    component: Layout,
    redirect: "noredirect",
    children: [{
      path: "index",
      component: () => import("@/views/list/index"),
      name: "list_index",
      meta: {
        title: "列表",
        icon: "el-icon-odometer",
        noCache: true,
        affix: false,
      },
    },],
  },
];

export default new Router({
  mode: "hash", // require service support
  routes: constantRouterMap,
});

export const asyncRouterMap = [{
  path: "*",
  redirect: "/404",
  hidden: true
}];