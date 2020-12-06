
export default (app):void => {
  const { controller, router } = app;
  // 创建角色权限联系
  router.post('/api/v1/roleRights', controller.roleRights.create);
  // 删除角色权限关系
  router.delete('/api/v1/roleRights/:roleId', controller.roleRights.deleteRoleRights);
};
