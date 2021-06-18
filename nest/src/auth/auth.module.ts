import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import {MailModule} from "../mail/mail.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {AuthResolvers} from "./auth.resolvers";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      MailModule,
      JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
          signOptions: { expiresIn: configService.get('LOGIN_TOKEN_EXPIRY', '15m') },
            secret: configService.get('JWT_SECRET', 'JWT_SECRET'),
        }),
        inject: [ConfigService],
      }),],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolvers],
  exports: [AuthService],
})
export class AuthModule {}
