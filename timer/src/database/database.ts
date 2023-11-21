import { Sequelize } from 'sequelize-typescript';
import { user } from 'src/app-common/entity/user.entity';
import { subscriber } from 'src/app-common/entity/subscriber.entity';
import { task } from 'src/app-common/entity/task.entity';
import { schedule } from 'src/app-common/entity/schedule.entity';
const dotenv = require('dotenv').config().parsed;
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: dotenv.dialect,
        host: dotenv.host,
        port: dotenv.port,
        username: dotenv.username,
        password: dotenv.password,
        database: dotenv.database,
      });
      sequelize.addModels([user, subscriber, task, schedule]);
      await sequelize.sync();
      return sequelize;
    },
  },
];




