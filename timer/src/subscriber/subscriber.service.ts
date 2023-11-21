import { Injectable } from '@nestjs/common';
import { subscriber } from '../app-common/entity/subscriber.entity';
import { CreateSubscriberDto } from '../app-common/dto/subscriberDto';
import { Pagination } from 'src/app-common/class/pagination/pagination';

@Injectable()
export class SubscriberService {
    /**Fetch all the subscribers for pagination */
    async fetchAllWithLimit(limit: number, offset: number): Promise<subscriber[]>{
        return await subscriber.findAll({
            offset: offset,
            limit: limit
          })
    }
    /**Fetch all the subscribers */
    async fetchAll(): Promise<subscriber[]>{
        return await subscriber.findAll();
    }
    /**check if subscriber already exists */
    async checkExists(email: string): Promise<boolean>{
        const exists  = await subscriber.findOne({
            where : {
                email
            }
        });
        return exists ?  true : false
    }
    /** insert new subscriber */
    async insertNew({ name, email, userId }: CreateSubscriberDto): Promise<subscriber> {
        return await subscriber.create({
          name, email, userId, createdBy: userId, updatedBy : userId
        })
      }
    /** deactivate subscription */
    async changeActivation(id: number, active: boolean): Promise<number[]> {
        return await subscriber.update({ active },  { where : {
                id
            }
        })
      }
}
