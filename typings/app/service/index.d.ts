// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportOauths from '../../../app/service/oauths';
import ExportRoles from '../../../app/service/roles';
import ExportTest from '../../../app/service/Test';
import ExportUserRoles from '../../../app/service/userRoles';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    oauths: AutoInstanceType<typeof ExportOauths>;
    roles: AutoInstanceType<typeof ExportRoles>;
    test: AutoInstanceType<typeof ExportTest>;
    userRoles: AutoInstanceType<typeof ExportUserRoles>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
