import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type BrandDocument = mongoose.HydratedDocument<Brand>

@Schema({ versionKey: false, collection: 'Brands', timestamps: true })
export class Brand {
  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: false, default: '', type: String })
  imageUrl: string
}

export const BrandSchema = SchemaFactory.createForClass(Brand)

BrandSchema.index({ name: 1, parentBrand: 1 }, { unique: true })
