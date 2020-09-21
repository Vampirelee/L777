import { Controller } from 'egg';
import emailUserRule from '../validator/emailUserRule';
import phoneUserRule from '../validator/phoneUserRule';

export default class UtilController extends Controller {
  public async imageCode() {
    const { ctx } = this;
    // 生成验证码
    const data = ctx.helper.createImageCode();
    ctx.response.type = 'image/svg+xml';
    ctx.body = data;
  }
  public async emailCode() {
    const { ctx } = this;
    const info = ctx.query;
    if (!emailUserRule.email.format.test(info.email)) {
      ctx.error(202, '邮箱格式不正确');
      return;
    }
    const data = await ctx.helper.sendEmailCode(info.email);
    ctx.success(data);
  }
  public async phoneCode() {
    const { ctx } = this;
    const info = ctx.query;
    if (!phoneUserRule.phone.format.test(info.phone)) {
      ctx.error(202, '手机格式不正确');
      return;
    }
    const data = await ctx.helper.sendSmsCode(info.phone);
    ctx.success(data);
  }
}
