import { Controller } from 'egg';
import normalUserRules from '../validator/normalUserRule';
import emailUserRule from '../validator/emailUserRule';
import phoneUserRule from '../validator/phoneUserRule';
const enum RegisterTypeEnum {
  NormalUserRule = 'normal',
  EmailUserRule = 'email',
  PhoneUserRule = 'phone'
}
export default class UsersController extends Controller {
  public async createUser() {
    const { ctx } = this;
    try {
      this.validateUserInfo();
      const res = await ctx.service.users.createUser(ctx.request.body);
      const dataInfo = (res as any).dataValues;
      delete dataInfo.password;
      ctx.success(dataInfo);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }

  }
  private validateUserInfo() {
    const { ctx } = this;
    const registerInfo = ctx.request.body;
    const registerType = registerInfo.registerType;
    const clientCode = registerInfo.captcha;
    switch (registerType) {
      // 用户名注册
      case RegisterTypeEnum.NormalUserRule:
        ctx.validate(normalUserRules, registerInfo);
        // 图形验证码是否正确
        ctx.helper.verifyImageCode(clientCode);
        break;

        // 邮箱注册
      case RegisterTypeEnum.EmailUserRule:
        ctx.validate(emailUserRule, registerInfo);
        // 邮箱验证码是否正确
        ctx.helper.verifyEmailCode(clientCode);
        break;

        // 手机注册
      case RegisterTypeEnum.PhoneUserRule:
        ctx.validate(phoneUserRule, registerInfo);
        // 手机验证码是否正确
        ctx.helper.verifySmsCode(clientCode);
        break;

      default:
        throw new Error('当前注册类型不存在！');
    }
  }
}
