import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class AuthenticatedUser {
    @Field({nullable: true})
    id?: number;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    email: string;

    @Field({nullable: true})
    token: string;
}
