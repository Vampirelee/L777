
export default (app):void => {
  const { controller, router } = app;
  // 获取权限
  router.get('/api/v1/rights', controller.rights.index);
  // 添加权限
  router.post('/api/v1/rights', controller.rights.addRights);
  // 添加权限
  router.delete('/api/v1/rights/:id', controller.rights.delRights);
  // 更新权限
  router.put('/api/v1/rights/:id', controller.rights.update);
};
