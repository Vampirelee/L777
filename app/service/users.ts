import { Service } from 'egg';
import encrypt from '../utils/encrypt';

/**
 * Test Service
 */
export default class User extends Service {

  public async createUser({ username, email, phone, password }) {
    const { ctx } = this;
    password = encrypt.encryptText(ctx.helper, password);
    if (username) {
      const user = await this.findUserByUsername(username);
      if (user) throw new Error('当前用户已存在，请登陆！');
      const data = await ctx.model.User.create({
        username,
        password,
      });

      delete data.password;
      return data;
    } else if (email) {
      const user = await this.findUserByEmail(email);
      if (user) throw new Error('当前用户已存在，请登陆！');
      const data = await ctx.model.User.create({
        email,
        password,
      });
      delete data.password;
      return data;
    } else if (phone) {
      const user = await this.findUserByPhone(phone);
      if (user) throw new Error('当前用户已存在，请登陆！');
      const data = await ctx.model.User.create({
        phone,
        password,
      });
      delete data.password;
      return data;
    }
  }
  public async findUserByUsername(username) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ where: { username } });
    return res;
  }
  public async findUserByEmail(email) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ where: { email } });
    return res;
  }
  public async findUserByPhone(phone) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ where: { phone } });
    return res;
  }
}
