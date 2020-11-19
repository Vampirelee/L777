import { Application } from 'egg';
import codeRouter from './router/code';
import accountRouter from './router/account';
import rolesRouter from './router/roles';

export default (app: Application) => {
  // const { controller, router } = app;
  codeRouter(app);
  accountRouter(app);
  rolesRouter(app);
};
