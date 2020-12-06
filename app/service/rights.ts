import { Service } from 'egg';
const { Op } = require('sequelize');
/**
 * Test Service
 */
export default class Rights extends Service {

  public async getRightList(query:any) {
    const { ctx } = this;
    const currentPage = parseInt(query.currentPage) || 1;
    const pageSize = parseInt(query.pageSize) || 5;
    const { key, rightsType, level } = query;
    const baseCondition = {
      [Op.or]: [
        { rights_name: { [Op.substring]: key } },
        { rights_desc: { [Op.substring]: key } },
      ],
    };
    const conditions:any[] = [];
    conditions.push(baseCondition);
    if (rightsType) {
      conditions.push({
        rights_type: rightsType,
      });
    }
    if (rightsType) {
      return this.getAllRightListByLevelType(rightsType, level);
    }
    const rightsLists = await ctx.model.Rights.findAll({
      attributes: {
        exclude: [ 'created_at', 'updated_at' ],
      },
      where: {
        [Op.and]: conditions,
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await ctx.model.Rights.findAndCountAll({
      where: {
        [Op.and]: conditions,
      },
    });
    return { rightsLists, totalCount: totalCount.count };

  }
  public async getAllRightList() {
    const { ctx } = this;
    const rightsLists = await ctx.model.Rights.findAll({
      attributes: {
        exclude: [ 'created_at', 'updated_at' ],
      },
    });
    const totalCount = await ctx.model.Rights.findAndCountAll();
    return { rightsLists, totalCount: totalCount.count };
  }
  public async getAllRightListByLevelType(right: string, level: number) {
    const { ctx } = this;
    const rightsLists = await ctx.model.Rights.findAll({
      where: {
        rightsType: right,
        level,
      },
    });
    const totalCount = await ctx.model.Rights.findAndCountAll();
    return { rightsLists, totalCount: totalCount.count };
  }
  public async addRights(obj:any) {
    const { ctx } = this;
    try {
      const right = await ctx.model.Rights.create(obj);
      return right;
    } catch (e) {
      throw new Error(e);
    }

  }
  public async delRight(id) {
    const { ctx } = this;
    const role = await ctx.model.Rights.findByPk(id);
    if (role) {
      const res = await ctx.model.Rights.destroy({ where: { id } });
      if (res > 0) {
        return res;
      }
      throw new Error('删除权限失败');
    }
    throw new Error('权限不存在！');
  }
  public async updateRight(id:string, data:any) {
    const { ctx } = this;
    const right = await ctx.model.Rights.findByPk(id);
    if (right) {
      const res = await ctx.model.Rights.update(data, { where: { id } });
      if (res.length > 0) {
        return res;
      }
      throw new Error('更新角色失败！');
    } else {
      throw new Error('权限不存在！');
    }
  }
}
