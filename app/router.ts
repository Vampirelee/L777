import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // 图形验证码
  router.get('/captcha', controller.util.imageCode);
  // 邮箱验证码
  router.get('/emailcode', controller.util.emailCode);
  // 手机验证码
  router.get('/phoneCode', controller.util.phoneCode);
  // 用户注册
  router.post('/register', controller.users.createUser);
  // 用户登录
  router.post('/login', controller.users.login);

  // 用户是否登录
  router.get('/islogin', controller.users.isLogin);

  // 获取用户
  router.get('/users', controller.users.users);


  // github第三方登录
  router.get('/github', controller.github.loginView);
};
