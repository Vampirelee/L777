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
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { Roles } from './roles';
import { User } from './user';


@Table({
  modelName: 'user_roles',
})
export class UserRoles extends Model<UserRoles> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    unique: true,
    allowNull: false,
    comment: 'id',
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
    unique: true,
    comment: 'userId',
  })
  user_id: number;


  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    field: 'role_id',
    allowNull: false,
    unique: false,
    comment: 'roleId',
  })
  role_id: number;


  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
export default () => UserRoles;
