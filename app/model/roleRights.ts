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
import { Rights } from './rights';


@Table({
  modelName: 'role_rights',
})
export class RoleRights extends Model<RoleRights> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    unique: true,
    allowNull: false,
    comment: 'id',
  })
  id: number;


  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    field: 'role_id',
    allowNull: false,
    unique: false,
    comment: 'roleId',
  })
  roleId: number;

  @ForeignKey(() => Rights)
  @Column({
    type: DataType.INTEGER,
    field: 'rights_id',
    allowNull: false,
    unique: true,
    comment: 'rightsId',
  })
  rightsId: number;


  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
export default () => RoleRights;
