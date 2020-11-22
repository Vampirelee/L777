/**
 * @desc 用户表
 */
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Oauths } from './oauths';
import { UserRoles } from './userRoles';
import { Roles } from './roles';
// 后端服务器静态资源地址
const BASEURL = 'http://127.0.0.1:7001';

@Table({
  modelName: 'user',
})
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    comment: '用户ID',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    comment: '用户姓名',
  })
  username: string;

  @Column({
    type: DataType.STRING,
    comment: '用户邮箱',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    comment: '用户手机',
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    comment: '用户密码',
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    comment: 'GitHub',
  })
  github: boolean;

  @Column({
    type: DataType.BOOLEAN,
    comment: '用户状态',
  })
  user_state: boolean;

  @Column({
    type: DataType.STRING,
    comment: '用户头像',
    /* get() {
      const rawValue = this.getDataValue('avatar_url');
      return rawValue ? BASEURL + rawValue : null;
    },*/
  })
  avatar_url: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return BASEURL;
    },
  })
  baseUrl: string;
  @HasMany(() => Oauths)
  oauths: Oauths[];

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
export default () => User;
