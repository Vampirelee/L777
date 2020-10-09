import { Controller } from 'egg';
import normalUserRules from '../validator/normalUserRule';
import emailUserRule from '../validator/emailUserRule';
import phoneUserRule from '../validator/phoneUserRule';
import jwt = require('jsonwebtoken');
const enum typeEnum {
  NormalUserRule = 'normal',
  EmailUserRule = 'email',
  PhoneUserRule = 'phone'
}
export default class UsersController extends Controller {
  public async users() {
    const { ctx } = this;
    try {
      const res = await ctx.service.users.findAll();
      ctx.success(res);
    } catch (e) {
      ctx.error(400, e);
    }
  }
  public async isLogin() {
    const { ctx } = this;
    const token = ctx.get('Authorization');
    try {
      const decode = jwt.verify(token, this.config.keys);
      ctx.success(decode);
    } catch (err) {
      ctx.error(400, err);
    }
  }
  public async login() {
    const { ctx } = this;
    try {
      // 图形验证码是否正确
      const requestData = ctx.request.body;
      const clientCode = requestData.captcha;
      ctx.helper.verifyImageCode(clientCode);

      const data = await this.validateUserLogin();
      // 存储用户会话状态(服务端)
      // ctx.session.user = data;
      // jwt存储会话状态
      delete data.password;
      const token = jwt.sign(data, this.config.keys, { expiresIn: '2 days' });
      data.token = token;
      ctx.success(data);

    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(200, e.message);
      }
    }
  }
  // 创建用户
  public async createUser() {
    const { ctx } = this;
    try {
      this.validateUserInfo();
      this.validateUserCode();
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
  // 校验用户注册验证码是否正确
  private validateUserCode() {
    const { ctx } = this;
    const registerInfo = ctx.request.body;
    const registerType = registerInfo.registerType;
    const clientCode = registerInfo.captcha;
    switch (registerType) {
      // 用户名注册
      case typeEnum.NormalUserRule:
        // 图形验证码是否正确
        ctx.helper.verifyImageCode(clientCode);
        break;

        // 邮箱注册
      case typeEnum.EmailUserRule:
        // 邮箱验证码是否正确
        ctx.helper.verifyEmailCode(clientCode);
        break;

        // 手机注册
      case typeEnum.PhoneUserRule:
        // 手机验证码是否正确
        ctx.helper.verifySmsCode(clientCode);
        break;

      default:
        throw new Error('验证码不正确！');
    }
  }

  // 校验用户填写格式是否正确
  private validateUserInfo() {
    const { ctx } = this;
    const registerInfo = ctx.request.body;
    const registerType = registerInfo.registerType;
    switch (registerType) {
      // 用户名注册
      case typeEnum.NormalUserRule:
        ctx.validate(normalUserRules, registerInfo);
        break;

        // 邮箱注册
      case typeEnum.EmailUserRule:
        ctx.validate(emailUserRule, registerInfo);
        break;

        // 手机注册
      case typeEnum.PhoneUserRule:
        ctx.validate(phoneUserRule, registerInfo);
        break;

      default:
        throw new Error('当前注册类型不存在！');
    }
  }

  // 校验用户登录
  private async validateUserLogin() {
    const { ctx } = this;
    const loginInfo = ctx.request.body;
    const { account, password } = loginInfo;
    return await ctx.service.users.getUser({ account, password });
  }
}
