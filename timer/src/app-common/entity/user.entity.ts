import { Table, Column, Model, PrimaryKey, AutoIncrement, NotNull, Default, AllowNull, HasMany, Unique } from 'sequelize-typescript';
import { subscriber } from './subscriber.entity';
import { task } from './task.entity';

@Table
export class user extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @AutoIncrement
  @Column
  id: number;
  @HasMany(() => subscriber, 'createdBy')
  subscriberCreateBy: user[];

  @HasMany(() => subscriber, 'updatedBy')
  subscriberUpdateBy: user[];

  @HasMany(() => task, 'createdBy')
  taskCreateBy: task[];

  @HasMany(() => task, 'updatedBy')
  taskUpdateBy: task[];
  
  @Unique('uniqueUserName')
  @AllowNull(false)
  @NotNull
  @Column
  name: string;
 
  @AllowNull(false)
  @NotNull
  @Column
  password: string;

  @Default(true)
  @Column
  active: boolean;
}

