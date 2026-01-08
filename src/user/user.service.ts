import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm"
import { IUserResponse } from "./types/userResponse.interface";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>){}
    async createUser(createUserDto:CreateUserDto): Promise<IUserResponse> {
        const newUser = new UserEntity()
        Object.assign(newUser,createUserDto)

        const savedUser = await this.userRepository.save(newUser);
        return this.generateUserResponse(savedUser);
    }

    generateUserResponse(user:UserEntity):IUserResponse{
        return{
            user: {
                ...user,
                token:""
            }
        };
    }
}