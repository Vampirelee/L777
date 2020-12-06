import { Controller } from 'egg';
import rightsRule from '../validator/rightsRule';

export default class RightsController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      if (JSON.stringify(ctx.query) !== '{}') {
        const res = await ctx.service.rights.getRightList(ctx.query);
        ctx.success(res);
      } else {
        const res = await ctx.service.rights.getAllRightList();
        const rightsArr = res.rightsLists;
        const rightsTree = rightsArr.filter((rightItem: any) => {
          if (!rightItem.dataValues.children) rightItem.dataValues.children = [];
          rightsArr.forEach((right: any) => {
            if (right.pid === rightItem.id) {
              rightItem.dataValues.children.push(right);
            }
          });
          return rightItem.level === 0;
        });
        ctx.success(rightsTree);
      }

    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async addRights() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      ctx.validate(rightsRule, data);
      const res = await ctx.service.rights.addRights(data);
      ctx.success(res);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async delRights() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const res = await ctx.service.rights.delRight(id);
      ctx.success(res);
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
      ctx.validate(rightsRule, data);
      const res = await ctx.service.rights.updateRight(id, data);
      ctx.success(res, 200);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
