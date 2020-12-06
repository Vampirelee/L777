import { Service } from 'egg';
const { Op } = require('sequelize');
import { Rights } from '../model/rights';
/**
 * Test Service
 */
export default class Roles extends Service {

  public async getRoleList(query:any) {
    const { ctx } = this;
    const currentPage = parseInt(query.currentPage) || 1;
    const pageSize = parseInt(query.pageSize) || 5;
    const { key } = query;
    const rolesLists = await ctx.model.Roles.findAll({
      attributes: {
        exclude: [ 'created_at', 'updated_at' ],
      },
      include: [{ model: Rights }],
      where: {
        [Op.or]: [
          { role_name: { [Op.substring]: key } },
          { role_desc: { [Op.substring]: key } },
        ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await ctx.model.Roles.findAndCountAll({
      where: { [Op.or]: [
        { role_name: { [Op.substring]: key } },
        { role_desc: { [Op.substring]: key } },
      ] },
    });
    return { rolesLists, totalCount: totalCount.count };
  }
  public async getAllRoleList() {
    const { ctx } = this;
    const rolesLists = await ctx.model.Roles.findAll({
      include: [{ model: Rights }],
    });
    const totalCount = await ctx.model.Roles.findAndCountAll();
    return { rolesLists, totalCount: totalCount.count };
  }
  public async addRole({ role_name, role_desc }) {
    const { ctx } = this;
    const role = await ctx.model.Roles.create({ role_name, role_desc, role_state: true });
    return role;
  }
  public async delRole(id) {
    const { ctx } = this;
    const role = await ctx.model.Roles.findByPk(id);
    if (role) {
      const res = await ctx.model.Roles.destroy({ where: { id } });
      if (res > 0) {
        return res;
      }
      throw new Error('删除用户失败');
    }
    throw new Error('用户不存在！');
  }
  public async updateRole(id:string, data:any) {
    const { ctx } = this;
    const role = await ctx.model.Roles.findByPk(id);
    if (role) {
      data.role_name ? '' : delete data.role_name;
      data.role_state !== undefined ? '' : delete data.role_state;
      data.role_desc ? '' : delete data.role_desc;

      const res = await ctx.model.Roles.update(data, { where: { id } });
      if (res.length > 0) {
        return res;
      }
      throw new Error('更新用户失败！');
    } else {
      throw new Error('用户不存在！');
    }
  }
}
