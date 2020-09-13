/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => User;
