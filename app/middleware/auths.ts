import jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function(ctx, next) {
    const urls = options.authUrls;
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
    }
  };
};
