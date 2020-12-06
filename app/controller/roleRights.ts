import { Controller } from 'egg';

// import addRoleRule from '../validator/addRoleRule';


class RoleRightsController extends Controller {
  public async create() {
    const { ctx } = this;
    const { roleId, rightsIds } = ctx.request.body;
    try {
      console.log(roleId, rightsIds);
      const res = await ctx.service.roleRights.create(roleId, rightsIds);
      ctx.success(res);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async deleteRoleRights() {
    const { ctx } = this;
    const { roleId } = ctx.params;
    const { rightsIds } = ctx.request.body;
    try {
      await ctx.service.roleRights.deleteRights(roleId, rightsIds);
      ctx.success('成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}

export default RoleRightsController;
