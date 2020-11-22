// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOauths from '../../../app/model/oauths';
import ExportRoles from '../../../app/model/roles';
import ExportUser from '../../../app/model/user';
import ExportUserRoles from '../../../app/model/userRoles';

declare module 'egg' {
  interface IModel {
    Oauths: ReturnType<typeof ExportOauths>;
    Roles: ReturnType<typeof ExportRoles>;
    User: ReturnType<typeof ExportUser>;
    UserRoles: ReturnType<typeof ExportUserRoles>;
  }
}
