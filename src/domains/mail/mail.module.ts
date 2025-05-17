import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

console.log(join(__dirname + '/templates'))

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('EMAIL_SENDER'),
            pass: config.get<string>('EMAIL_APP_PASSWORD')
          }
        },
        template: {
          dir: join(__dirname + '/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        },
        preview: config.get<string>('EMAIL_PREVIEW') === 'true' ? true : false
      })
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
