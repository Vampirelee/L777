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
      ctx.success({});
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
      case RegisterTypeEnum.NormalUserRule:
        ctx.validate(normalUserRules, registerInfo);
        // 验证码是否正确
        ctx.helper.verifyImageCode(clientCode);
        break;
      case RegisterTypeEnum.EmailUserRule:
        ctx.validate(emailUserRule, registerInfo);
        // 验证码是否正确
        ctx.helper.verifyImageCode(clientCode);
        break;
      case RegisterTypeEnum.PhoneUserRule:
        ctx.validate(phoneUserRule, registerInfo);
        // 验证码是否正确
        ctx.helper.verifyImageCode(clientCode);
        break;
      default:
        throw new Error('当前注册类型不存在！');
    }
  }
}
