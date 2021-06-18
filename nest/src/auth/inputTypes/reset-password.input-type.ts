import {Field, InputType} from "@nestjs/graphql";
import {IsNotEmpty} from "class-validator";
import {LoginUserInputType} from "./login-user.input-type";

@InputType()
export class ResetPasswordInputType extends LoginUserInputType {
    @Field()
    @IsNotEmpty()
    token: string
}
