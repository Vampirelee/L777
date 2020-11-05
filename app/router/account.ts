export default (app):void => {
  const { controller, router } = app;
  // 用户注册
  router.post('/register', controller.users.createUser);
  // 用户登录
  router.post('/login', controller.users.login);

  // 用户是否登录
  router.get('/islogin', controller.users.isLogin);

  // 获取用户
  router.get('/api/v1/users', controller.users.index);

  // 添加用户
  router.post('/api/v1/users', controller.users.addUser);

  // 删除用户
  router.delete('/api/v1/users/:id', controller.users.destroy);

  // 更新用户
  router.put('/api/v1/users/:id', controller.users.update);

  // 上传文件
  router.post('/api/v1/posts', controller.users.posts);
  // 上传用户
  router.post('/api/v1/importUser', controller.users.importUser);

  // 导出所有用户
  router.get('/api/v1/exportUser', controller.users.exportUser);

  // github第三方登录(手动实现)
  // router.get('/github', controller.github.getLoginView);
  // router.get('/github/callback', controller.github.getAccessToken);

  // app/router.js
  // 挂载鉴权路由 （第三方插件实现）
  // (app as any).passport.mount('github');
  // 上面的 mount 是语法糖，等价于
  const github = app.passport.authenticate('github', {
    successRedirect: 'http://127.0.0.1:8080/admin',
  });
  router.get('/passport/github', github);
  router.get('/passport/github/callback', github);
};
