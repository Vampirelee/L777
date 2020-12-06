import jwt = require('jsonwebtoken');

const isRequest = (actionRights:any, path:string, method:string) => {
  const reg = new RegExp(`^${actionRights.rightsPath}(/[0-9a-zA-Z]*)?$`, 'i');
  if (reg.test(path) && actionRights.rightsMethod === method) return true;
  if (actionRights.children) {
    for (let i = 0; i < actionRights.children.length; i++) {
      const item = actionRights.children[i];
      if (isRequest(item, path, method)) return true;
    }
  }
  return false;
};

const getActionRights = ctx => {
  const userInfo = ctx.session.user;
  if (!userInfo) return null;
  const actionRights = userInfo.rightsTree.filter((rights:any) => {
    if (rights.rightsType === 'action') return true;
  });
  return actionRights[0];
};
let actionRights;
module.exports = (options, app) => {
  console.log(options);
  return async function(ctx, next) {
    let curPath = ctx.url.toLowerCase();
    const curMethod = ctx.request.method.toLowerCase();
    if (!curPath.startsWith('/api/v1')) {
      // 不需要权限控制
      await next();
      return;
    }
    if (!actionRights) {
      actionRights = getActionRights(ctx);
    }
    if (!actionRights) {
      ctx.error(400, '没有权限3');
      return;
    }
    const idx = curPath.indexOf('?');
    if (idx !== -1) {
      // /api/vi/users?page=1&pageSize=5; -> /api/vi/users
      curPath = curPath.substr(0, idx);
    }
    const flag = isRequest(actionRights, curPath, curMethod);
    if (flag) {
      // 3.获取客户端传递过来的JWT令牌
      const token = ctx.cookies.get('token', {
        signed: false,
      });
      // 4.判断客户端有没有传递JWT令牌
      if (token) {
        try {
          await jwt.verify(token, app.config.keys);
          await next();
        } catch (e) {
          ctx.error(400, '没有权限2');
        }
      } else {
        ctx.error(400, '没有权限1');
      }
    } else {
      ctx.error(400, '没有权限11');
    }

    /* const urls = options.authUrls;
    if (urls.includes(ctx.url)) {
      const token = ctx.cookies.get('token', {
        signed: true,
      });
      if (token) {
        try {
          jwt.verify(token, app.config.keys);
          await next();
        } catch (e) {
          ctx.error(401, '没有获得权限');
        }
      } else {
        ctx.error(401, '没有获得权限');
      }
    } else {
      await next();
    }*/
  };
};
