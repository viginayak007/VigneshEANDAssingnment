import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { user } from 'src/app-common/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { schedule } from 'src/app-common/entity/schedule.entity';
import { task } from 'src/app-common/entity/task.entity';
import { EventJobService } from './event-job.service';
const dotenv = require('dotenv').config().parsed;
@Injectable()
export class DatabaseService implements OnApplicationBootstrap{
    private readonly logger = new Logger(DatabaseService.name);
    constructor( private eventJobService: EventJobService) {}
    async generateRootUser() {
        const salt = await bcrypt.genSalt(Number(dotenv.salt));
        const hashedPassword = await bcrypt.hash(dotenv.password, salt);
        const result = await user.findOrCreate({
            where : {
                name: dotenv.username
            },
            defaults : {
                name: dotenv.username, 
                password: hashedPassword
            }});
        this.logger.log(`Default root user : name ${dotenv.username} ${result[1]} created: ${result[0]}`);
        return result
    }
   
    async onApplicationBootstrap() {
        await this.eventJobService.initJobs();
        await this.generateRootUser();
    }
}


