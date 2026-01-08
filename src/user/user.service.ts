import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { IUserResponse } from "./types/userResponse.interface";
import { sign } from "jsonwebtoken";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {

        // ✅ CHECK EMAIL
        const userByEmail = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        });

        // ✅ CHECK USERNAME
        const userByUsername = await this.userRepository.findOne({
            where: { username: createUserDto.username }
        });

        // ✅ THROW ERROR
        if (userByEmail || userByUsername) {
            throw new HttpException(
                "Email or username already taken",
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        // ✅ CREATE USER
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);

        const savedUser = await this.userRepository.save(newUser);

        return this.generateUserResponse(savedUser);
    }  

    generateToken(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
        );
    }

    generateUserResponse(user: UserEntity): IUserResponse {
        return {
            user: {
                ...user,
                token: this.generateToken(user),
            }
        };
    }
}
