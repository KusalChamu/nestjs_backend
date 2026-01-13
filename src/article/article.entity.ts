import {BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { UserEntity } from "../user/user.entity";

@Entity({name:"articles"})
export class ArticleEntity{
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    slug:string;

    @Column()
    description:string;

    @Column()
    body:string;

    @Column()
    title:string;

    @Column("simple-array")
    tagList:string[]

    @Column({type:"timestamp",default:()=>"CURRENT_TIMESTAMP"})
    createdAt:Date

    @Column({type:"timestamp",default:()=>"CURRENT_TIMESTAMP"})
    updatedAt:Date

    @Column({default:0})
    favouriteCount:number;

    @Column()
    authorId:number;

    @ManyToOne(()=> UserEntity,(user)=>user.articles)
    @JoinColumn({name:"authorId"})
    author:UserEntity;

    @BeforeUpdate()
    updateTimeStamp(){
        this.updatedAt = new Date();
    }

}