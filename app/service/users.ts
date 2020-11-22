import { Service } from 'egg';
import encrypt from '../utils/encrypt';
import { Roles } from '../model/roles';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Op } = require('sequelize');


/**
 * Test Service
 */
export default class User extends Service {

  // 查找是否存在用户
  public async getUser({ account, password }) {
    password = encrypt.encryptText(this.ctx.helper, password);
    try {
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
      return res.dataValues;
    } catch (e) {
      throw new Error('用户名或者密码不正确');
    }
  }

  // 增加用户
  public async addUser(data) {
    const { username, email, phone, password } = data;
    const { ctx } = this;
    data.password = encrypt.encryptText(ctx.helper, password);
    let user = await ctx.model.User.findOne({ where: { username } });
    if (user) throw new Error('用户名已存在，请重新添加！');
    user = await ctx.model.User.findOne({ where: { email } });
    if (user) throw new Error('该邮箱已被其他用户绑定，请重新输入！');
    user = await ctx.model.User.findOne({ where: { phone } });
    if (user) throw new Error('该手机号已被其他用户绑定，请重新输入！');

    const result = await ctx.model.User.create(data);
    const userData = (result as any).dataValues;
    delete userData.password;
    return userData;


  }

  // 删除用户

  public async destroyUser(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(id);
    if (user) {
      const result = await ctx.model.User.destroy({ where: { id } });
      if (result > 0) {
        return result;
      }
      throw new Error('删除用户失败');

    } else {
      throw new Error('无法删除，用户不存在！');
    }
  }

  public async updateUser(id, data) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(id);
    if (user) {
      data.username ? '' : delete data.username;
      data.password ? '' : delete data.password;
      data.email ? '' : delete data.email;
      data.phone ? '' : delete data.phone;
      const result = await ctx.model.User.update(data, { where: { id } });
      if (result.length > 0) {
        return result;
      }
      throw new Error('更新用户失败');

    } else {
      throw new Error('无法更新用户，用户不存在！');
    }
  }
  public async createUser(obj) {
    const { username, email, phone, password } = obj;
    if (!username && !email && !phone) {
      throw new Error('请使用用户名或邮箱或手机注册');
    }
    const { ctx } = this;
    obj.password = encrypt.encryptText(ctx.helper, password);
    let user;
    if (username) {
      user = await ctx.model.User.findOne({ where: { username } });
      if (user) {
        throw new Error('用户名已存在');
      }
    } else {
      delete obj.username;
    }
    if (email) {
      user = await ctx.model.User.findOne({ where: { email } });
      if (user) {
        throw new Error('邮箱已存在');
      }
    } else {
      delete obj.email;
    }
    if (phone) {
      user = await ctx.model.User.findOne({ where: { phone } });
      if (user) {
        throw new Error('手机号已存在');
      }
    } else {
      delete obj.phone;
    }
    const data = await ctx.model.User.create(obj);
    delete data.password;
    return data;
  }

  public async findUser(options) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ where: options });
    return res;
  }

  public async findAll() {
    const { ctx } = this;
    const res = await ctx.model.User.findAll({
      attributes: {
        exclude: [ 'password', 'created_at', 'updated_at' ],
      },
    });
    return res;
  }

  public async getUserList(query: any) {
    const { ctx } = this;
    const pageSize = parseInt(query.pageSize) || 5;
    const currentPage = parseInt(query.currentPage) || 1;
    const { role, origin, type, key } = query;
    const baseCondition = {
      [Op.or]: [
        { username: { [Op.substring]: key } },
        { phone: { [Op.substring]: key } },
        { email: { [Op.substring]: key } }],
    };
    if (key || role || origin || type) {
      const conditionLists:any[] = [];
      if (key) {
        conditionLists.push(baseCondition);
      }
      if (origin) {
        conditionLists.push({ [origin]: true });
      }
      if (type) {
        conditionLists.push({ [type]: { [Op.substring]: key } });
      }

      // TODO 用户角色待添加
      /* if (role) {

      }*/

      const userLists = await ctx.model.User.findAll({
        attributes: {
          exclude: [ 'password', 'created_at', 'updated_at' ],
        },
        include: [{ model: Roles }],
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: { [Op.and]: conditionLists },
      });
      const totalCount = await ctx.model.User.findAndCountAll({
        where: { [Op.and]: conditionLists },
      });
      return { userLists, totalCount: totalCount.count };
    }
    const userLists = await ctx.model.User.findAll({
      attributes: {
        exclude: [ 'password', 'created_at', 'updated_at' ],
      },
      include: [{ model: Roles }],
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await ctx.model.User.findAndCountAll();
    return { userLists, totalCount: totalCount.count };

  }
}
