import { Table, Column, Model, PrimaryKey, AutoIncrement, NotNull, IsEmail, Default, AllowNull, Unique, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { schedule } from './schedule.entity';
import { user } from './user.entity';

@Table
export class subscriber extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @AutoIncrement
  @Column
  id: number;
  @HasMany(() => schedule, 'subscriberId')
  scheduler: schedule[];

  @Unique('uniqueSubscribe')
  @AllowNull(false)
  @NotNull
  @Column
  name: string;
 
  @Unique('uniqueSubscribe')
  @AllowNull(false)
  @NotNull
  @IsEmail
  @Unique
  @Column
  email: string;

  @Default(true)
  @Column
  active: boolean;

  @ForeignKey(() => user)
  @Column
  createdBy: number;

  @ForeignKey(() => user)
  @Column
  updatedBy: number;

  @BelongsTo(() => user, 'createdBy')
  manyUserCreate: user;

  @BelongsTo(() => user, 'updatedBy')
  mayUserUpdate: user;
}
