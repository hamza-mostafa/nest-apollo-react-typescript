import {Injectable, UnauthorizedException} from '@nestjs/common';
import { Post } from './posts.entity';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post)
         private readonly postRepository: typeof Post
    ) {}


    async create(createPostData: Partial<Post>, user: User): Promise<Post | Error> {
        try {
            const post = new Post();
            post.title = createPostData.title;
            post.createdAt = new Date().toString();
            post.createdBy = user.id;
            await post.save()
            console.log({post})
            return post
        } catch (e) {
            console.error(e.message)
            throw Error(e.message)
        }
    }

    async update(updatePostData: Partial<Post>, user: User): Promise<Post | Error> {
        try {
            const post = await this.findOneById(updatePostData.id);
            if(user.id !== (<Post>post).createdBy){
                throw new UnauthorizedException('Not the creator of the post')
            }
            if(updatePostData.title != null){
                (<Post>post).title = updatePostData.title;
            }
            return (<Post>post).save();
        } catch (e) {
            console.error(e.message)
            throw Error(e.message)
        }
    }

    async remove(id: number, user: User): Promise<Post | Error> {
        try {
            const post = await this.findOneById(id)
            if(user.id !== (<Post>post).createdBy){
                throw new UnauthorizedException('Not the creator of the post')
            }
            if(post){
                await this.postRepository.destroy({where: {id}})
            }
            return post
        } catch (e) {
            console.error(e.message)
            throw Error(e.message)
        }
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.findAll({include: [User]})
    }

    async findOneById(id: number): Promise<Post | Error> {
        return this.postRepository.findOne({include: [User], where: {id}});
    }
}
