import { Table, Column, Model, PrimaryKey, AutoIncrement, NotNull, Default, AllowNull, HasMany, BelongsTo, ForeignKey, Unique, IsDate } from 'sequelize-typescript';
import { schedule } from './schedule.entity';
import { user } from './user.entity';
import { isNotEmpty } from 'class-validator';

@Table
export class task extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @AutoIncrement
  @Column
  id: number;
  @HasMany(() => schedule, 'taskId')
  schedule: schedule[];

  @AllowNull(false)
  @NotNull
  @Column
  title: string;
 
  @AllowNull(false)
  @NotNull
  @Column
  body: string;
  
  @AllowNull(false)
  @NotNull
  @Column
  cronPattern: string;

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
  manyUseUpdate: user;
}
