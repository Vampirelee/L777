import { Controller } from 'egg';
import queryString = require('querystring');
import jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';

export default class GithubController extends Controller {
  public async getLoginView() {
    const { ctx } = this;
    // 1 获取第三方登录界面
    const baseURL = 'https://github.com/login/oauth/authorize';
    const options = {
      client_id: '2a8e9eae947bfe27803e',
      scope: 'user',
    };
    const url = baseURL + '?' + queryString.stringify(options);
    ctx.redirect(url);
  }
  public async getAccessToken() {
    const { ctx } = this;
    const { code } = ctx.query;
    const baseURL = 'https://github.com/login/oauth/access_token';
    const options = {
      client_id: '2a8e9eae947bfe27803e',
      client_secret: '6ad99af6d674ec06ca08e1e1ba87171b921d66ec',
      code,
    };
    const result = await ctx.curl(baseURL, {
      method: 'POST',
      data: options,
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
    const accessToken = result.data.access_token;
    await this.getGithubUserInfo(accessToken);
  }
  private async getGithubUserInfo(accessToken) {
    const { ctx } = this;
    const baseURL = 'https://api.github.com/user';
    const result = await ctx.curl(baseURL, {
      method: 'GET',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const data = JSON.parse(result.data);
    data.provider = 'github';
    await this.go2Admin(data);
  }
  private async go2Admin(data) {
    const { ctx } = this;
    try {
      // 用户存在，直接登录
      const user = await ctx.service.oauths.getUser(data);
      delete user!.password;
      const token = jwt.sign(user, this.config.keys, { expiresIn: '2 days' });
      ctx.cookies.set('token', token, {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 有效期7天
      });
      ctx.redirect('http://127.0.0.1:8080/admin');
    } catch (e) {
      // 用户不存在，先注册再登录
      // 1.注册用户（用户名 / 密码）
      const user = {
        username: uuidv4(),
        email: undefined,
        phone: undefined,
        password: 'com.1234',
      };
      const result = await ctx.service.users.createUser(user);
      const dataInfo = (result as any).dataValues;
      console.log(dataInfo);
      // 2.保存授权信息
      // 3.直接登录
    }

  }
}
