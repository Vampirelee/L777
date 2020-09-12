import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.middleware = [];
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
  };
  config.sessionRedis = {
    name: 'session',
  };
  // 发送邮件相关配置
  config.smtp = {
    host: 'smtp.qq.com',
    port: 465,
    user: 'lidaohuan@qq.com', // generated ethereal user
    pass: 'afrrdzkvxcokcaef', // generated ethereal password
  };
  return config;
};
