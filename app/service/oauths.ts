import { Service } from 'egg';
import { User } from '../model/user';

/**
 * Test Service
 */
export default class Oauths extends Service {
  public async getUser({ id, provider }) {
    const { ctx } = this;
    const data = await ctx.model.Oauths.findOne({
      where: {
        uid: id,
        provider,
      },
      include: [
        { model: User },
      ],
    });
    try {
      return data!.dataValues.user!.dataValues;
    } catch (e) {
      throw new Error('授权用户不存在');
    }

  }
}
