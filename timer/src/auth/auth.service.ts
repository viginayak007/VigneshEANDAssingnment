import { Injectable } from '@nestjs/common';
import { user } from 'src/app-common/entity/user.entity';
@Injectable()
export class AuthService {
     /**Fetch all the users */
     async fetchUserDetails(name): Promise<user>{
        return await user.findOne({
            where : {
                name
            }
        });
    }
}
