import nodemailer = require('nodemailer');
export default {
  /**
     * 创建邮箱发送器
     */
  createEmailTransporter() {
    return nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'lidaohuan@qq.com', // generated ethereal user
        pass: 'afrrdzkvxcokcaef', // generated ethereal password
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
    const transporter = this.createEmailTransporter();
    const info = this.createEmailInfo(ctx, to);

    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });

  },
};
