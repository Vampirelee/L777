import imageCode from '../utils/imageCode';
import emailCode from '../utils/emailCode';
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
};
