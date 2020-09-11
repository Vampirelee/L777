import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/captcha', controller.util.imageCode);
  router.get('/emailcode', controller.util.emailCode);
  router.post('/register', controller.users.createUser);
};
