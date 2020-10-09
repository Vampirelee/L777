import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    if (ctx.session) {
      ctx.body = ctx.session;
    } else {
      ctx.body = '没有登录信息';
    }

  }
}
