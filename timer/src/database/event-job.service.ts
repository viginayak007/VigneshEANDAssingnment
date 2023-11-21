import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Op } from 'sequelize';
import { schedule } from 'src/app-common/entity/schedule.entity';
import { task } from 'src/app-common/entity/task.entity';
import { DatabaseService } from './database.service';

@Injectable()
export class EventJobService {
    private readonly logger = new Logger(EventJobService.name);
    constructor(private schedulerRegistry: SchedulerRegistry){}
    async initJobs() {
            // deactivate all the schedules before current time
        const deactivateSchedules =  await schedule.update({
            active: false
            }, {
                where: {
                    active : true,
                    time : {
                        [Op.lt]: new Date()
                    },
                }
            });
        
        this.logger.log(`Deactivated schedules ${ deactivateSchedules.length }`);
        const activeSchedules  = await schedule.findAll({
                attributes: ['taskId'],
                where: {
                    active: true
                },
                group: ['taskId'],
                raw: true,
            });
        const taskIds = activeSchedules.map(s => s.taskId);
        const deactivateTasks =  await task.update({
            active: false
            }, {
                where : {
                    id: {
                        [Op.notIn] : taskIds,
                    },
                    active: true
                }
            });
        const allActiveTasks =  await task.findAll({
            where: {
                active: true
            },
            raw: true,
        });
        const allDeactivatedTasks =  await task.findAll({
            where: {
                active: false
            }
        });
        this.logger.log(`${ allActiveTasks[0] } fetched number of Task active tasks`);
        this.generateBulkJob(allActiveTasks)
        this.deleteDeactivatedTasks(allDeactivatedTasks)
    }
    async deleteDeactivatedTasks(tasks: task[]) {
        for (let t of tasks) {
            const jobName = `${ t.id }`
            const exists  = this.checkCronJobs(jobName);
            if (exists) {
                this.schedulerRegistry.deleteCronJob(jobName);
                this.logger.warn(`job ${jobName} deleted!`);
            }
        }
        
    }
    checkCronJobs(jobName) {
        const jobs = this.schedulerRegistry.getCronJobs();
        let exists = false;
        jobs.forEach((value, key, map) => {
            if (key === jobName) {
                exists = true 
            }
        })
        return exists;
        
    }
    generateBulkJob(tasks: task[]) {
        tasks.forEach(t => {
            const jobName = `${ t.id }`;
            const checkJobExists = this.checkCronJobs(jobName);
            if (!checkJobExists) {
                this.addNewJob(jobName, t.cronPattern);
            }
        });
    }
   
    addNewJob(jobName: string, pattern: string) {
        const job = new CronJob(pattern, () => {
            this.logger.log(`time (${pattern}) for job ${jobName} to run!`);
            this.afterJobExecuted(Number(jobName), pattern)
        }, null, true, 'Etc/GMT')
        
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
        this.logger.log(`Job ${jobName} added for every ${pattern}`);
    }

    async afterJobExecuted(taskId: number, pattern: string) {
        const updateSchedule = await schedule.update({
            delivered: true,
            deliveredTime: new Date(),
            active: false
        },
        {
            where : {
                taskId,
                time : {
                    [Op.lte] : new Date()
                }
            }    
        });
        this.logger.log(`Job ${task} pattern ${pattern} completed successfully with count ${ updateSchedule[0] }`);
        this.initJobs();
    }
}
