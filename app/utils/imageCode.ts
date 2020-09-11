import svgCaptcha = require('svg-captcha');
export default {
    createImageCode (ctx) {
        // 生成验证码
        const captcha = svgCaptcha.create({
            size: 4, // size of random string
            ignoreChars: '0o1i', // filter out some characters like 0o1i
            width: 100,
            height: 62,
            fontSize: 50,
            noise: 2, // number of noise lines
            color: true, // characters will have distinct colors instead of grey, true if background option is set
            background: '#eee', // background color of the svg image
        });
        ctx.session.captcha = {
            code: captcha.text,
            expire: Date.now() + 60 * 1000 //验证码过期时间为1分钟
        };
        console.log(captcha.text);
        return captcha.data;
    }
}