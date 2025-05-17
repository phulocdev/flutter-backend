import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AccountsModule } from 'domains/accounts/accounts.module'
import { JwtStrategy } from 'domains/auth/jwt.strategy'
import { LocalEmployeeStrategy } from 'domains/auth/local.strategy'
import { MailService } from 'domains/mail/mail.service'
import { OtpsModule } from 'domains/otps/otps.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { OtpsService } from 'domains/otps/otps.service'

@Module({
  imports: [PassportModule, AccountsModule, OtpsModule],
  controllers: [AuthController],
  providers: [AuthService, LocalEmployeeStrategy, JwtStrategy, JwtService, MailService]
})
export class AuthModule {}
