import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false, versionKey: false })
export class ShippingInfo {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, required: true })
  phoneNumber: string

  @Prop({ type: String, required: true })
  province: string

  @Prop({ type: String, required: true })
  district: string

  @Prop({ type: String, required: true })
  ward: string

  @Prop({ type: String, required: true })
  detailedAddress: string
}

export const ShippingInfoSchema = SchemaFactory.createForClass(ShippingInfo)
