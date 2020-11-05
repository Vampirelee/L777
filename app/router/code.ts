
export default (app):void => {
  const { controller, router } = app;
  // 图形验证码
  router.get('/captcha', controller.util.imageCode);
  // 邮箱验证码
  router.get('/emailcode', controller.util.emailCode);
  // 手机验证码
  router.get('/phoneCode', controller.util.phoneCode);
};
