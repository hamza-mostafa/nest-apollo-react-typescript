import {Field, InputType} from "@nestjs/graphql";
import {IsNotEmpty} from "class-validator";
import {CreatePostInputType} from "./create-post.input-type";

@InputType()
export class UpdatePostInputType extends CreatePostInputType {
    @Field()
    @IsNotEmpty()
    id: number;
}
