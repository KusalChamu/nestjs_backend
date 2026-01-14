import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserEntity } from "../user/user.entity";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { User } from "../user/decorators/user.decorator";
import { ArticleService } from "./article.service";
import { IArticleResponse } from "./types/articleResponse.interface";
import { AuthGuard } from "../user/guards/auth.guard";

@Controller("articles")
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard)
export class ArticleController{
    constructor(private readonly articleService:ArticleService){}

    @Post()
    async createArticle(@User() userInfo:UserEntity,@Body("article") createArticleDto:CreateArticleDto):Promise<IArticleResponse>{
        const newArticle = await this.articleService.createArticle(userInfo,createArticleDto)
        return this.articleService.generateArticleResponse(newArticle)
    }
}