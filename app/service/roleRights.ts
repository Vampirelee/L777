import { Service } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires


/**
 * Test Service
 */
class RoleRights extends Service {

  // 查找是否存在用户
  public async create(roleId:number, rightsIds:number[]) {
    const { ctx } = this;
    const transaction = await ctx.model.transaction();
    try {
      rightsIds.forEach(async id => {
        await ctx.model.RoleRights.create({ roleId, rightsId: id });
      });
      transaction.commit();
      return '添加角色成功';
    } catch (e) {
      transaction.rollback();
      throw new Error('添加角色失败');
    }
  }
  public async deleteRights(roleId:number, rightsIds:number[]) {
    const { ctx } = this;
    const transaction = await ctx.model.transaction();
    try {
      rightsIds.forEach(async id => {
        await ctx.model.RoleRights.destroy({ where: { roleId, rightsId: id } });
      });
      transaction.commit();
      return '移除成功';
    } catch (e) {
      transaction.rollback();
      throw new Error('删除失败');
    }
  }

}
export default RoleRights;
