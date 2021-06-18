import {Field, ObjectType} from "@nestjs/graphql";
import {Post} from "../posts/posts.model";

@ObjectType()
export class User {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => [Post], {nullable: true})
    posts?: Array<Post>;
}
