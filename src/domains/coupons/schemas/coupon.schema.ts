import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

export type CouponDocument = Coupon & Document

@Schema({ timestamps: true, versionKey: false, collection: 'Coupons' })
export class Coupon {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId

  @Prop({
    required: true,
    type: String,
    unique: true,
    uppercase: true,
    validate: {
      validator: function (v: string) {
        return /^[A-Z0-9]{5}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid coupon code. Code must be 5 alphanumeric characters.`
    }
  })
  code: string

  @Prop({
    required: true,
    type: Number,
    enum: [10000, 20000, 50000, 100000],
    message: 'Discount amount must be one of: 10000, 20000, 50000, or 100000 VND'
  })
  discountAmount: number

  @Prop({ required: true, type: Number, default: 0 })
  usageCount: number

  @Prop({
    required: true,
    type: Number,
    min: 1,
    max: 10,
    validate: {
      validator: function (v: number) {
        return v >= 1 && v <= 10
      },
      message: (props) => `Max usage must be between 1 and 10, got ${props.value}`
    }
  })
  maxUsage: number

  @Prop({ required: false, type: [mongoose.Schema.Types.ObjectId], default: [] })
  appliedOrderIds: mongoose.Types.ObjectId[]

  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean

  // Virtual properties for use in API
  get isValid(): boolean {
    return this.isActive && this.usageCount < this.maxUsage
  }

  get remainingUsage(): number {
    return this.maxUsage - this.usageCount
  }
}

export const CouponSchema = SchemaFactory.createForClass(Coupon)

// Add virtual properties to the schema
CouponSchema.virtual('isValid').get(function () {
  return this.isActive && this.usageCount < this.maxUsage
})

CouponSchema.virtual('remainingUsage').get(function () {
  return this.maxUsage - this.usageCount
})

// Configure the schema to include virtuals when converting to JSON
CouponSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    return ret
  }
})
