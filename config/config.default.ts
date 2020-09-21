import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_LEEDAOHUAN.*?';

  config.cors = {
    origin: 'http://127.0.0.1:8080', // 设置单个域
    // origin: ctx => { // 设置多个域
    //   const validDomains = [ 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://192.168.100.69:8080' ];
    //   if (validDomains.indexOf(ctx.request.header.origin) !== -1) {
    //     return ctx.request.header.origin;
    //   }
    //   return validDomains[0]; // we can't return void, so let's return one of the valid domains
    // },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  // add your egg config in here

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
