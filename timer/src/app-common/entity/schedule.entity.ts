import { Table, Column, Model, PrimaryKey, AutoIncrement, 
  NotNull, Default, AllowNull, ForeignKey, BelongsTo, IsDate, Index, Unique } from 'sequelize-typescript';
import { subscriber } from './subscriber.entity';
import { task } from './task.entity';

@Table
export class schedule extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @AutoIncrement
  @Column
  id: number;
 
  @Unique('uniqueTag')
  @ForeignKey(() => task)
  @AllowNull(false)
  @NotNull
  @Column
  taskId: number;
  
  @Unique('uniqueTag')
  @ForeignKey(() => subscriber)
  @AllowNull(false)
  @NotNull
  @Column
  subscriberId: number;

  @Unique('uniqueTag')
  @AllowNull(false)
  @NotNull
  @IsDate
  @Column
  time: Date;

  @Default(false)
  @Column
  delivered: boolean;

  @AllowNull(true)
  @IsDate
  @Column
  deliveredTime: Date;

  @Default(true)
  @Column
  active: boolean;
  
  @BelongsTo(() => task, 'taskId')
  manyTasks: task;

  @BelongsTo(() => subscriber, 'subscriberId')
  subscribedEmail: subscriber;
}
