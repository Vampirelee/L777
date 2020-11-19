import { Controller } from 'egg';
import addRoleRule from '../validator/addRoleRule';

// import addRoleRule from '../validator/addRoleRule';


export default class UsersController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      if (JSON.stringify(ctx.query) !== '{}') {
        const res = await ctx.service.roles.getRoleList(ctx.query);
        ctx.success(res);
      } else {
        const res = await ctx.service.roles.getAllRoleList();
        ctx.success(res);
      }

    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async addRole() {
    const { ctx } = this;
    const { role_name, role_desc } = ctx.request.body;
    try {
      ctx.validate(addRoleRule, { role_name, role_desc });
      const res = await ctx.service.roles.addRole({ role_name, role_desc });
      ctx.success(res);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async delRole() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const res = await ctx.service.roles.delRole(id);
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
      ctx.validate(addRoleRule, data);
      const res = await ctx.service.roles.updateRole(id, data);
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
