/**
 * @desc 角色表
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt, BelongsToMany,
  // BelongsToMany,
} from 'sequelize-typescript';
import { Roles } from './roles';
import { RoleRights } from './roleRights';
// import { User } from './user';
// import { UserRoles } from './userRoles';


@Table({
  modelName: 'rights',
})
export class Rights extends Model<Rights> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    comment: '权限ID',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    comment: '权限名',
    field: 'rights_name',
  })
  rightsName: string;

  @Column({
    type: DataType.STRING,
    comment: '权限描述',
    field: 'rights_desc',
  })
  rightsDesc: string;

  @Column({
    type: DataType.BOOLEAN,
    comment: '权限状态',
    field: 'rights_state',
  })
  rightsState: boolean;

  @Column({
    type: DataType.STRING,
    comment: '权限类型',
    field: 'rights_type',
  })
  rightsType: string;

  @Column({
    type: DataType.STRING,
    comment: '方法',
    field: 'rights_method',
  })
  rightsMethod: string;

  @Column({
    type: DataType.STRING,
    comment: '路径',
    field: 'rights_path',
  })
  rightsPath: string;

  @Column({
    type: DataType.INTEGER,
    comment: '父路径id',
  })
  pid: number;

  @Column({
    type: DataType.INTEGER,
    comment: '当前层级',
  })
  level: number;
  // @BelongsToMany(() => User, () => UserRoles)
  // user: User[];

  @BelongsToMany(() => Roles, () => RoleRights)
  roles: Roles[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
export default () => Rights;
