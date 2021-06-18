import {Field, InputType, OmitType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, Max, Min} from "class-validator";
import {RegisterUserInputType} from "./register-user.input-type";

@InputType()
export class LoginUserInputType  extends OmitType(RegisterUserInputType, ['name']){}
