import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, Max, Min} from "class-validator";

@InputType()
export class RegisterUserInputType {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    @IsNotEmpty()
    password: string
}
