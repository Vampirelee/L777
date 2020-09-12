import nodemailer = require('nodemailer');
export default {
  /**
     * 创建邮箱发送器
     */
  createEmailTransporter(ctx) {
    return nodemailer.createTransport({
      host: ctx.app.config.smtp.host,
      port: ctx.app.config.smtp.port,
      secure: ctx.app.config.smtp.port === 465, // true for 465, false for other ports
      auth: {
        user: ctx.app.config.smtp.user, // generated ethereal user
        pass: ctx.app.config.smtp.pass, // generated ethereal password
      },
    });
  },
  /**
     * 创建发送内容等信息
     * @param ctx ctx对象
     * @param to 收件人邮箱
     */
  createEmailInfo(ctx, to:string) {
    // 邮箱验证码
    const code = Math.random().toString(16).slice(4, 8);

    // 存储验证码到session中
    ctx.session.emailCode = {
      code,
      expire: Date.now() + 60 * 1000,
    };
    return {
      from: 'lidaohuan@qq.com', // 谁发的
      to, // 发给谁
      subject: '随意一下管理后台注册验证码', // 邮件标题
      text: `您正在注册随意一下管理后台系统, 您的验证码是:${code}`, // 邮件内容
    };
  },

  /**
     * 发送邮件
     * @param ctx ctx对象
     * @param to 收件人邮箱
     */
  async sendEmailInfo(ctx, to:string) {
    const transporter = this.createEmailTransporter(ctx);
    const info = this.createEmailInfo(ctx, to);

    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });

  },

  verifyEmailCode(ctx, emailCode) {
    const serviceEmailCode = ctx.session.emailCode;
    let serviceCode,
      serviceExpire;
    try {
      serviceCode = serviceEmailCode.code;
      serviceExpire = serviceEmailCode.expire;
    } catch (e) {
      ctx.session.emailCode = null;
      throw new Error('邮箱验证码已过期');
    }

    if (Date.now() > serviceExpire) {
      ctx.session.eamilCode = null;
      throw new Error('邮箱验证码已过期');
    } else if (emailCode !== serviceCode) {
      ctx.session.eamilCode = null;
      throw new Error('邮箱验证码不正确');
    }
    ctx.session.emailCode = null;
  },
};
