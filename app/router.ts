import { Application } from 'egg';
import codeRouter from './router/code';
import accountRouter from './router/account';

export default (app: Application) => {
  // const { controller, router } = app;
  codeRouter(app);
  accountRouter(app);
};
