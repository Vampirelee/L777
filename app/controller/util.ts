import { Controller } from 'egg';

const nodemailer = require("nodemailer");

export default class UtilController extends Controller {
    public async imageCode() {
        const { ctx } = this;
        // 生成验证码
        let data = ctx.helper.createImageCode();
        ctx.success(data);
    }
    public async emailCode() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "lidaohuan@qq.com", // generated ethereal user
                pass: 'afrrdzkvxcokcaef', // generated ethereal password
            },
        });
        let code = Math.random().toString(16).slice(4,8);
        // send mail with defined transport object
        let info = {
            from: "lidaohuan@qq.com", // 谁发的
            to: "18224468664@163.com", // 发给谁
            subject: "知播渔管理后台注册验证码", // 邮件标题
            text: `您正在注册知播渔管理后台系统, 您的验证码是:${code}`, // 邮件内容
        };
        // 3.发送邮件
        transporter.sendMail(info, (err, data)=>{
            if(err){
                console.log('发送邮件失败:', err);
            }else{
                console.log('发送邮件成功:', data);
            }
        })
    }
}