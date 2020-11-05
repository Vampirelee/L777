import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.redis = {
    clients: {
      session: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 0,
      },
    },
  };
  // 添加sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'it666',
    timezone: '+08:00',
  };
  config.sessionRedis = {
    name: 'session',
  };
  // 发送邮件相关配置
  config.smtp = {
    host: '',
    port: 465,
    user: '', // generated ethereal user
    pass: '', // generated ethereal password
  };
  // 短信相关配置
  config.sms = {
    accessKeyId: '',
    accessKeySecret: '',
  };
  return config;
};
