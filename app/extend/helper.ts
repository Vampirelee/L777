import imageCode from "../utils/imageCode";
module.exports = {
    createImageCode() {
        // this.ctx => context 对象
        return imageCode.createImageCode(this.ctx);
    },
    verifyImageCode (ctx, clientCode){
        const serviceCaptcha = ctx.session.captcha;
        let serviceCode, serviceExpire;
        try {
            serviceCode = serviceCaptcha.code;
            serviceExpire = serviceCaptcha.expire;
        } catch (e) {
            ctx.session.captcha = null;
            throw new Error('验证码已过期');
        }
        if (Date.now() > serviceExpire) {
            ctx.session.captcha = null;
            throw new Error('验证码已过期');
        } else if (clientCode !== serviceCode) {
            ctx.session.captcha = null;
            throw new Error('验证码不正确');
        }
        ctx.session.captcha = null;
    }
};