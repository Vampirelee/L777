import { Controller } from 'egg';
import { User } from '../model/user';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const data = await ctx.model.Oauths.findOne({
      where: {
        id: 1,
      },
      include: [
        { model: User },
      ],
    });
    ctx.body = data;
  }
}
