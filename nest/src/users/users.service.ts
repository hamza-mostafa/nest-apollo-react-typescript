import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import {InjectModel} from "@nestjs/sequelize";
import {RegisterRequestDto} from "../auth/dto/register-request.dto";
import {Post} from "../posts/posts.entity";


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userRepository: typeof User
    ) {}

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {email}});
    }

    async create(createUserData: RegisterRequestDto): Promise<User | Error> {
        try {
            const user = new User();
            user.name = createUserData.name;
            user.password = createUserData.password;
            user.email = createUserData.email;
            return user.save()
        } catch (e) {
            console.error(e.message)
            throw Error(e.message)
        }
    }


}
