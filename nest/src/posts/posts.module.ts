import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import {Post} from "./posts.entity";
import {SequelizeModule} from "@nestjs/sequelize";
import {PostResolvers} from "./posts.resolvers";

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostsService, PostResolvers]
})
export class PostsModule {}
