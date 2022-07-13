const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  userInfo: (state) => state.user.userInfo,
  roles: (state) => state.user.roles,
  addRouters: (state) => state.permission.addRouters,
  permission_routers: (state) => state.permission.routers,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
};
export default getters;
