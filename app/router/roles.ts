
export default (app):void => {
  const { controller, router } = app;
  // 获取角色
  router.get('/api/v1/roles', controller.roles.index);
  // 添加角色
  router.post('/api/v1/roles', controller.roles.addRole);
  // 添加角色
  router.delete('/api/v1/roles/:id', controller.roles.delRole);
  // 更新角色
  router.put('/api/v1/roles/:id', controller.roles.update);
};
