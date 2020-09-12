import imageCode from '../utils/imageCode';
import emailCode from '../utils/emailCode';
import phoneCode from '../utils/phoneCode';
module.exports = {
  createImageCode() {
    // this.ctx => context 对象
    return imageCode.createImageCode(this.ctx);
  },
  verifyImageCode(clientCode) {
    imageCode.verifyImageCode(this.ctx, clientCode);
  },

  async sendEmailCode(to:string) {
    return await emailCode.sendEmailInfo(this.ctx, to);
  },

  verifyEmailCode(clientCode) {
    emailCode.verifyEmailCode(this.ctx, clientCode);
  },

  async sendSmsCode(phone) {
    return await phoneCode.sendSms(this.ctx, phone);
  },
  verifySmsCode(clientCode) {
    phoneCode.verifySmsCode(this.ctx, clientCode);
  },

};
