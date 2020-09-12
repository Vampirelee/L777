import Core = require('@alicloud/pop-core');
export default {
  createSmsCode(ctx) {
    // 生成验证码
    return new Core({
      accessKeyId: ctx.app.config.sms.accessKeyId,
      accessKeySecret: ctx.app.config.sms.accessKeySecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
  },
  createSmsContent(ctx, phone) {
    // 短信验证码
    const code = Math.random().toString(16).slice(4, 8);
    const codeJson = JSON.stringify({ code });

    // 存储验证码到session中
    ctx.session.smsCode = {
      code,
      expire: Date.now() + 60 * 1000,
    };

    return {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: phone,
      SignName: 'ABC商城',
      TemplateCode: 'SMS_202546653',
      TemplateParam: codeJson,
    };
  },

  sendSms(ctx, phone) {
    const requestOption = { method: 'POST' };
    const client = this.createSmsCode(ctx);
    const info = this.createSmsContent(ctx, phone);
    return client.request('SendSms', info, requestOption).then(result => {
      return result;
    }, ex => {
      return ex;
    });
  },
  verifySmsCode(ctx, clientCode) {
    const serviceSmsCode = ctx.session.smsCode;
    let serviceCode,
      serviceExpire;
    try {
      serviceCode = serviceSmsCode.code;
      serviceExpire = serviceSmsCode.expire;
    } catch (e) {
      throw new Error('验证码已过期');
    }
    if (Date.now() > serviceExpire) {
      throw new Error('验证码已过期');
    } else if (clientCode !== serviceCode) {
      throw new Error('验证码不正确');
    }
    ctx.session.smsCode = null;
  },
};
