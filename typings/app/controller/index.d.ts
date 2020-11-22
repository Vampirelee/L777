// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGithub from '../../../app/controller/github';
import ExportHome from '../../../app/controller/home';
import ExportRoles from '../../../app/controller/roles';
import ExportUserRoles from '../../../app/controller/userRoles';
import ExportUsers from '../../../app/controller/users';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    github: ExportGithub;
    home: ExportHome;
    roles: ExportRoles;
    userRoles: ExportUserRoles;
    users: ExportUsers;
    util: ExportUtil;
  }
}
