import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {User} from "../users/users.entity";
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {AuthenticatedResponseDto} from "./dto/authenticated-response.dto";
import {ConfigService} from "@nestjs/config";
import {ResetPasswordInputType} from "./inputTypes/reset-password.input-type";
import {RegisterUserInputType} from "./inputTypes/register-user.input-type";
import {LoginUserInputType} from "./inputTypes/login-user.input-type";
import {ForgetPasswordInputType} from "./inputTypes/forget-password.input-type";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private mailService: MailService,
        private jwtService: JwtService,
        private configService: ConfigService) {}

    async sendResetLink(user: User, token) {
        return this.mailService.sendUserResetPassword(user, token);
    }

    async register(requestData: RegisterUserInputType): Promise<AuthenticatedResponseDto | Error> {
        try {
            requestData.password = await bcrypt.hash(requestData.password, parseInt(this.configService.get('SALT_ROUNDS', '10')));
            const exists = await this.usersService.findOneByEmail(requestData.email)
            if(exists){
                throw Error('There is an account with this email')
            }
            const user = <User>await this.usersService.create(requestData)
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token: this.jwtService.sign({username: requestData.email, userId: user.id })
            }
        } catch (e) {
            console.error(e.message)
            throw Error(e.message)
        }
    }

    async login(requestData: LoginUserInputType): Promise<any | Error> {
        const user = await this.usersService.findOneByEmail(requestData.email);
        if(!user){
            throw Error('user not found')
        }
        const isMatch = await bcrypt.compare(requestData.password, user.password);
        if (user && isMatch) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token: this.jwtService.sign({username: requestData.email, userId: user.id })
            }
        }
        throw Error('mismatched password')
    }

    async resetPassword(requestData: ResetPasswordInputType): Promise<AuthenticatedResponseDto | Error> {
        const user = await this.usersService.findOneByEmail(requestData.email);
        const isMatch = requestData.token === user.reset_token
        if(user && isMatch){
            user.reset_token = null;
            user.password = await bcrypt.hash(requestData.password, parseInt(this.configService.get('SALT_ROUNDS', '10')));
            await user.save()
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token: this.jwtService.sign({username: requestData.email, userId: user.id })
            }
        }
        throw Error('token mismatch, please reset your password again')
    }

    async forgetPassword(requestData: ForgetPasswordInputType): Promise<any> {
        const user = await this.usersService.findOneByEmail(requestData.email);
        const token = await this.jwtService.sign(
            {username: requestData.email, userId: user.id },
            {expiresIn: this.configService.get('RESET_TOKEN_EXPIRY', '1w')}
        )
        user.reset_token = token;
        await user.save()
        // email server needs setup, however service is coded
        // return this.sendResetLink(user, token)
        return this.configService.get('FRONTEND_URL', 'localhost:3000/reset-password/token/') + token
    }

}
