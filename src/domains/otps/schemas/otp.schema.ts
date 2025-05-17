import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type OtpDocument = HydratedDocument<Otp>

@Schema({ versionKey: false, timestamps: true, collection: 'Otp' })
export class Otp {
  @Prop()
  email: string

  @Prop()
  otp: number

  @Prop({ type: Date, expires: '10m', default: Date.now })
  createdAt: Date
}

export const OtpSchema = SchemaFactory.createForClass(Otp)

OtpSchema.index({ otp: 1 }, { unique: true })
