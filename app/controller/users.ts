import { Controller } from 'egg';
import normalUserRules from '../validator/normalUserRule';
import emailUserRule from '../validator/emailUserRule';
import phoneUserRule from '../validator/phoneUserRule';
import addUserRule from '../validator/addUserRule';
import editUserRule from '../validator/editUserRule';
import jwt = require('jsonwebtoken');
import path = require('path');
import fs = require('fs');
import xlsx = require('node-xlsx');

const enum typeEnum {
  NormalUserRule = 'normal',
  EmailUserRule = 'email',
  PhoneUserRule = 'phone'
}
class UsersController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const res = await ctx.service.users.getUserList(ctx.query);
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

      const user = await this.validateUserLogin();

      // 判断用户是否可用
      if (!user.user_state) return ctx.error(400, '用户已注销');
      // 存储用户会话状态(服务端)
      // ctx.session.user = data;
      // jwt存储会话状态
      delete user.password;
      const token = jwt.sign(user, this.config.keys, { expiresIn: '2 days' });
      // data.token = token;
      ctx.cookies.set('token', token, {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 有效期7天
        signed: false,
      });
      ctx.success(user);

    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async addUser() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      ctx.validate(addUserRule, data);
      const user = await ctx.service.users.addUser(data);
      ctx.success(user, 200);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const res = await ctx.service.users.destroyUser(id);
      ctx.success(res, 200);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = ctx.request.body;
    try {
      ctx.validate(editUserRule, data);
      const res = await ctx.service.users.updateUser(id, data);
      ctx.success(res, 200);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async posts() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const fileName = ctx.helper.encryptText(file.filename + Date.now()) + path.extname(file.filename);
    let filePath = path.join('/public/upload', fileName);
    const absFilePath = path.join(this.config.baseDir, 'app', filePath);

    const readStream = fs.readFileSync(file.filepath);
    fs.writeFileSync(absFilePath, readStream);
    filePath = filePath.replace(/\\/g, '/');
    ctx.success(filePath);
  }

  public async importUser() {
    const { ctx } = this;
    // 定义事务
    const transaction = await ctx.model.transaction();
    try {
      const file = ctx.request.files[0];
      const workSheets = xlsx.parse(fs.readFileSync(file.filepath));
      const sheet1 = workSheets.length ? workSheets[0] : null;
      const sheet1Data = sheet1 ? sheet1.data : [];
      const users:any[] = [];
      // 获取到所有的key
      const cloumnTitles = sheet1Data[0];
      // 生成users数据
      for (let i = 1; i < sheet1Data.length; i++) {
        // 获取到当前行的数据
        const cloumnValues = sheet1Data[i];
        const user = {};
        for (let j = 0; j < cloumnTitles.length; j++) {
          user[cloumnTitles[j]] = cloumnValues[j];
        }
        await ctx.service.users.createUser(user);
        users.push(user);
      }
      await transaction.commit();
      ctx.success(users);
    } catch (e) {
      await transaction.rollback();
      ctx.error(500, e.message);
    }
  }

  public async exportUser() {
    const { ctx } = this;
    const users = await ctx.service.users.findAll();
    const user = users.length ? users[0].dataValues : null;
    if (user) {
      const keys = Object.keys(user);
      const data: any[] = [];
      data.push(keys);
      users.forEach(item => {
        const temp:any[] = [];
        keys.forEach(key => {
          temp.push(item[key]);
        });
        data.push(temp);
      });
      const buffer = xlsx.build([{ name: 'mySheetName', data }]);
      ctx.set('Content-Type', 'application/vnd.ms-excel');
      // ctx.set('Content-disposition', 'attachment; filename=foobar.pdf');
      ctx.attachment('user.xls');
      ctx.body = buffer;
      return;
    }
    ctx.error(500, '导出失败');
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

export default UsersController;