import { Service } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires


/**
 * Test Service
 */
class UserRoles extends Service {

  // 查找是否存在用户
  public async create(userId:number, roleId:number) {
    const { ctx } = this;
    const res = await ctx.model.UserRoles.create({ user_id: userId, role_id: roleId });
    return res;
  }
  public async deleteRole(userId: number, roleId: number) {
    const { ctx } = this;
    try {
      await ctx.model.UserRoles.destroy({
        where: {
          user_id: userId,
          role_id: roleId,
        },
      });
    } catch (e) {
      throw new Error('删除失败');
    }

  }

}
export default UserRoles;
