import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_LEEDAOHUAN.*?';

  // add your egg config in here
  config.middleware = [];
  config.security = {
    csrf: {
        enable: false
    },
  };
  config.redis = {
    clients: {
      session: {
          host: '127.0.0.1',
          port: 6379,
          password: '',
          db: 0,
      }
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
