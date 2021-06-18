import {Field, InputType} from "@nestjs/graphql";
import {IsNotEmpty} from "class-validator";

@InputType()
export class DeletePostInputType {
    @Field()
    @IsNotEmpty()
    id: number;
}
