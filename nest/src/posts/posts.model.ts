import {Field, ObjectType} from "@nestjs/graphql";
import {User} from "../users/users.model";

@ObjectType()
export class Post {
    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    createdAt: string;

    @Field()
    createdBy: number;

    @Field({nullable: true})
    creator?: User;
}
