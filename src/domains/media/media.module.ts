import { Module } from '@nestjs/common'
import { MediaController } from './media.controller'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { MediaService } from './media.service'
import { JwtStrategy } from 'domains/auth/jwt.strategy'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('multerDest')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [MediaController],
  providers: [MediaService, JwtStrategy]
})
export class MediaModule {}
