import {Field, InputType, OmitType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty} from "class-validator";
import {LoginUserInputType} from "./login-user.input-type";

@InputType()
export class ForgetPasswordInputType extends OmitType(LoginUserInputType, ['password']){}
