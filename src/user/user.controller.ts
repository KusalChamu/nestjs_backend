import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { IUserResponse } from "./types/userResponse.interface";

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @UsePipes(new ValidationPipe())
    @Post()
    async createUser(@Body("user") createUserDto:CreateUserDto):Promise<any>{
        return await this.userService.createUser(createUserDto);
    }

    @Post("login")
    async loginUser(@Body("user") loginUserDto:any): Promise<IUserResponse>{
        return {} as IUserResponse;
    }
}