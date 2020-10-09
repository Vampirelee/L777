// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuths from '../../../app/middleware/auths';

declare module 'egg' {
  interface IMiddleware {
    auths: typeof ExportAuths;
  }
}
