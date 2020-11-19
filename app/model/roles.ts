/**
 * @desc 角色表
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';


@Table({
  modelName: 'roles',
})
export class Roles extends Model<Roles> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    comment: '角色ID',
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
    comment: '角色状态',
  })
  role_state: boolean;

  @Column({
    type: DataType.STRING,
    comment: '角色名',
  })
  role_name: string;

  @Column({
    type: DataType.STRING,
    comment: '角色描述',
  })
  role_desc: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
export default () => Roles;
