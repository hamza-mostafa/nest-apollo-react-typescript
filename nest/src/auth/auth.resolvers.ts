import {RegisterUserInputType} from "./inputTypes/register-user.input-type";
import {AuthService} from "./auth.service";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {AuthenticatedUser} from "./authenticated-users.model";
import {LoginUserInputType} from "./inputTypes/login-user.input-type";
import {ResetPasswordInputType} from "./inputTypes/reset-password.input-type";
import {ForgetPasswordInputType} from "./inputTypes/forget-password.input-type";
import {AuthenticatedResponseDto} from "./dto/authenticated-response.dto";

@Resolver(() => AuthenticatedUser)
export class AuthResolvers {
    constructor(private authService: AuthService) {
    }

    @Mutation(() => AuthenticatedUser)
    async register(@Args('registerData') registerData : RegisterUserInputType): Promise<AuthenticatedUser | Error> {
        return this.authService.register(registerData);
    }

    @Mutation(() => AuthenticatedUser)
    async login(@Args('loginData') loginData : LoginUserInputType): Promise<AuthenticatedUser | Error> {
        return this.authService.login(loginData);
    }

    @Mutation(() => AuthenticatedUser)
    async resetPassword(@Args('resetPasswordData') resetPasswordData: ResetPasswordInputType) {
        return this.authService.resetPassword(resetPasswordData);
    }

    @Mutation(() => String)
    async forgetPassword(@Args('forgetPasswordData') forgetPasswordData: ForgetPasswordInputType) {
        return this.authService.forgetPassword(forgetPasswordData);
    }
}
