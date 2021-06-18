import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {User} from "../users/users.entity";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService) {}

    async sendUserResetPassword(user: User, token: string): Promise<any> {
        const url = `${this.configService.get('FRONTEND_URL', 'localhost:3000')}/auth/confirm?token=${token}`;
        try {
            return this.mailerService.sendMail({
                to: user.email,
                subject: 'We got you!',
                template: './confirmation',
                context: {
                    name: user.name,
                    url,
                },
            });
        } catch (e) {
        // should handle the error based on the email service
            console.error(e.message)
            throw Error(e.message)
        }
    }
}
