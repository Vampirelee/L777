import { Controller } from 'egg';

// import addRoleRule from '../validator/addRoleRule';


class UserRolesController extends Controller {
  public async create() {
    const { ctx } = this;
    const { userId, roleId } = ctx.request.body;
    try {
      const res = await ctx.service.userRoles.create(userId, roleId);
      ctx.success(res);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async deleteRole() {
    const { ctx } = this;
    const { userId } = ctx.params;
    const { roleId } = ctx.request.body;
    try {
      await ctx.service.userRoles.deleteRole(userId, roleId);
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

export default UserRolesController;
