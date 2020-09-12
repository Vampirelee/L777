import { Controller } from 'egg';

export default class UtilController extends Controller {
  public async imageCode() {
    const { ctx } = this;
    // 生成验证码
    const data = ctx.helper.createImageCode();
    ctx.success(data);
  }
  public async emailCode() {
    const { ctx } = this;
    const info = ctx.query;
    const data = ctx.helper.sendEmailCode(info.email);
    ctx.success(data);
  }
}
