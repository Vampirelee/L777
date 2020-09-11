import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
    // 开启sequlize
   /* sequelize: {
        enable: true,
        package: 'egg-sequelize',
    }*/
    // 开启sequlize-ts
    sequelize : {
        enable: true,
        package: 'egg-sequelize-ts'
    },
    // 校验插件
    validate : {
        enable: true,
        package: 'egg-validate',
    },
    sessionRedis : {
        enable: true,
        package: 'egg-session-redis',
    },
    redis : {
        enable: true,
        package: 'egg-redis',
    }
};

export default plugin;
