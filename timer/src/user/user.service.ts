import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/app-common/class/pagination/pagination';
import { CreateUserDto } from 'src/app-common/dto/userDto';
import { user } from 'src/app-common/entity/user.entity';
import * as bcrypt from 'bcrypt';
const dotenv = require('dotenv').config().parsed;
@Injectable()
export class UserService {
    /**Fetch all the users for pagination */
    async fetchAllWithLimit({limit, offset} : Pagination): Promise<user[]>{
        return await user.findAll({
            limit,
            offset
          })
    }
    /**Fetch all the users */
    async fetchAll(): Promise<user[]>{
        return await user.findAll();
    }
    /**check if user already exists */
    async checkExists(name: string): Promise<boolean>{
        const exists  = await user.findOne({
            where : {
                name
            }
        });
        return exists ?  true : false
    }
    /** insert new user */
    async insertNew({ name, password }: CreateUserDto): Promise<user> {
        const salt = await bcrypt.genSalt(Number(dotenv.salt));
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await user.create({
          name, 
          password: hashedPassword
        });
        return result[0]
      }
    /** deactivate subscription */
    async changeActivation(id: number, active: boolean): Promise<number[]> {
        return await user.update({ active },  { where : {
                id
            }
        })
      }
}
