import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ValidationError } from 'class-validator'
import { client, database, environment, port, server, token, upload } from 'config'
import AnyExceptionFilter from 'core/exceptions/any-exception-filter'
import { UnprocessableEntityError } from 'core/exceptions/errors.exception'
import { JwtAuthGuard } from 'core/guards/jwt-auth.guard'
import { TransformResponseInterceptor } from 'core/interceptors/transform-response.interceptor'
import { extractErrorMessageFromDto } from 'core/utils/utils'
import Joi from 'joi'
import mongoose from 'mongoose'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment, port, database, token, upload, client, server],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').required(),
        PORT: Joi.number().port().required(),
        DATABASE_URI: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        MULTER_DEFAULT_DEST: Joi.string().required(),
        SERVER_BASE_URL: Joi.string().required()
      })
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('databaseUri')
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        stopAtFirstError: true,
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          const errorMessage = extractErrorMessageFromDto(validationErrors)
          return new UnprocessableEntityError(
            validationErrors.map((error, index) => ({
              field: error.property,
              message: errorMessage[index]
            }))
          )
        }
      })
    },
    { provide: APP_FILTER, useClass: AnyExceptionFilter }
  ],
  exports: []
})
export class CoreModule {}
