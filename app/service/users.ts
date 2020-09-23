import { Service } from 'egg';
import encrypt from '../utils/encrypt';

/**
 * Test Service
 */
export default class User extends Service {

  // 查找是否存在用户
  public async getUser({ account, password }) {
    password = encrypt.encryptText(this.ctx.helper, password);
    let isUser = false;
    let res:any;
    if (!isUser) {
      res = await this.findUser({ username: account, password });
      if (res) isUser = true;
    }
    if (!isUser) {
      res = await this.findUser({ email: account, password });
      if (res) isUser = true;
    }
    if (!isUser) {
      res = await this.findUser({ phone: account, password });
    }
    try {
      return res.dataValues;
    } catch (e) {
      throw new Error('用户名或者密码不正确');
    }
  }

  public async createUser({ username, email, phone, password }) {
    if (username) {
      return await this.creatUserByUsername(username, password);
    } else if (email) {
      return await this.creatUserByEmail(email, password);
    } else if (phone) {
      return await this.creatUserByPhone(phone, password);
    }
  }
  public async creatUserByUsername(username, password) {
    const { ctx } = this;
    password = encrypt.encryptText(ctx.helper, password);
    const res = await this.findUser({ username });
    if (res) throw new Error('当前用户已存在，请登陆！');
    const data = await ctx.model.User.create({ username, password });
    delete data.password;
    return data;
  }
  public async creatUserByEmail(email, password) {
    const { ctx } = this;
    password = encrypt.encryptText(ctx.helper, password);
    const res = await this.findUser({ email });
    if (res) throw new Error('当前用户已存在，请登陆！');
    const data = await ctx.model.User.create({ email, password });
    delete data.password;
    return data;
  }
  public async creatUserByPhone(phone, password) {
    const { ctx } = this;
    password = encrypt.encryptText(ctx.helper, password);
    const res = await this.findUser({ phone });
    if (res) throw new Error('当前用户已存在，请登陆！');
    const data = await ctx.model.User.create({ phone, password });
    delete data.password;
    return data;
  }

  public async findUser(options) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ where: options });
    return res;
  }
}
