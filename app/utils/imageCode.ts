import svgCaptcha = require('svg-captcha');
export default {
  createImageCode(ctx) {
    // 生成验证码
    const captcha = svgCaptcha.create({
      size: 4, // size of random string
      ignoreChars: '0o1i', // filter out some characters like 0o1i
      width: 80,
      height: 40,
      fontSize: 50,
      noise: 2, // number of noise lines
      color: true, // characters will have distinct colors instead of grey, true if background option is set
      background: '#eee', // background color of the svg image
    });
    ctx.session.captcha = {
      code: captcha.text,
      expire: Date.now() + 60 * 1000, // 验证码过期时间为1分钟
    };
    console.log(captcha.text);
    return captcha.data;
  },
  verifyImageCode(ctx, clientCode) {
    const serviceCaptcha = ctx.session.captcha;
    let serviceCode,
      serviceExpire;
    try {
      serviceCode = serviceCaptcha.code;
      serviceExpire = serviceCaptcha.expire;
    } catch (e) {
      throw new Error('验证码已过期');
    }
    if (Date.now() > serviceExpire) {
      throw new Error('验证码已过期');
    } else if (clientCode !== serviceCode) {
      throw new Error('验证码不正确');
    }
    ctx.session.captcha = null;
  },
};
