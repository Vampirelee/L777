/**
 * @desc 第三方授权表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
@Table({
  modelName: 'oauths',
})
export class Oauths extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    comment: 'id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    comment: '授权token',
  })
  access_token: string;

  @Column({
    type: DataType.STRING,
    comment: '第三方提供者名称',
  })
  provider: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'uid',
  })
  uid: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    comment: 'user_id',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => Oauths;
