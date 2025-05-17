import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly mailerService;
    private configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendOtp(email: string, otpCode: number): Promise<void>;
}
