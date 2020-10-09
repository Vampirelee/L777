import { Controller } from 'egg';
import queryString = require('querystring');

export default class GithubController extends Controller {
  public async loginView() {
    const { ctx } = this;
    // 1 获取第三方登录界面
    const baseURL = 'https://github.com/login/oauth/authorize';
    const options = {
      client_id: '2a8e9eae947bfe27803e',
      scope: 'user',
    };
    const url = baseURL + '?' + queryString.stringify(options);
    console.log(url);
    ctx.redirect(url);
  }
}
