// app.js

import jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    try {
      // 用户存在，直接登录
      const existUser = await ctx.service.oauths.getUser(user);
      delete existUser!.password;
      const token = jwt.sign(existUser, app.config.keys, { expiresIn: '2 days' });
      ctx.cookies.set('token', token, {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 有效期7天
        signed: false,
      });
      return existUser;
    } catch (e) {
      // 1.注册用户（用户名 / 密码）
      const userInfo = {
        username: uuidv4(),
        password: 'com.1234',
        github: 1,
      };
      const newUser = await ctx.service.users.createUser(userInfo);
      const dataInfo = (newUser as any).dataValues;
      // 2.保存授权信息
      const oauthInfo = {
        access_token: user.accessToken,
        provider: user.provider,
        uid: user.id,
        user_id: dataInfo.id,
      };
      await ctx.service.oauths.createOAuth(oauthInfo);
      // 3.直接登录
      const token = jwt.sign(dataInfo, app.config.keys, { expiresIn: '2 days' });
      ctx.cookies.set('token', token, {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 有效期7天
      });
      return dataInfo;
    }
  });
};
