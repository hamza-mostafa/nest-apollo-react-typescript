import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import {Post} from "./posts.model";
import {CreatePostInputType} from "./inputTypes/create-post.input-type";
import {UpdatePostInputType} from "./inputTypes/update-post.input-type";
import {DeletePostInputType} from "./inputTypes/delete-post.input-type";
import {FetchPostArgs} from "./Args/fetch-post.args";
import {CurrentUser} from "../auth/auth-gql.decorator";
import {User} from "../users/users.entity";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/guards/jwt-auth.guard";

@Resolver(() => Post)
export class PostResolvers {
    constructor(private postService: PostsService) {
    }

    @Query(() => [Post])
    // @UseGuards(GqlAuthGuard)
    async posts() {
        return this.postService.findAll()
    }

    @Query(() => Post)
    @UseGuards(GqlAuthGuard)
    async post(@Args({
        nullable: true
    }) fetchPostArgs : FetchPostArgs): Promise<Post | Error> {
        if(fetchPostArgs.id === undefined && fetchPostArgs.title === undefined){
            throw Error('Please provide either id or title')
        }
        return this.postService.findOneById(fetchPostArgs.id);
    }

    @Mutation(() => Post)
    @UseGuards(GqlAuthGuard)
    async createPost(
        @Args('createPostData') createPostData : CreatePostInputType,
        @CurrentUser() user: User): Promise<Post | Error> {
        return this.postService.create(createPostData, user);
    }

    @Mutation(() => Post)
    @UseGuards(GqlAuthGuard)
    async updatePost(
        @Args('updatePostData') updatePostData: UpdatePostInputType,
        @CurrentUser() user: User): Promise<Post | Error>  {
        return this.postService.update(updatePostData, user);
    }

    @Mutation(() => Post)
    @UseGuards(GqlAuthGuard)
    async deletePost(
        @Args('deletePostData') deletePostData: DeletePostInputType,
        @CurrentUser() user: User): Promise<Post | Error>  {
        return this.postService.remove(deletePostData.id, user);
    }
}
