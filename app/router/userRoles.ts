
export default (app):void => {
  const { controller, router } = app;
  // 创建角色联系
  router.post('/api/v1/userrole', controller.userRoles.create);
  // 删除角色关系
  router.delete('/api/v1/userrole/:userId', controller.userRoles.deleteRole);
};
