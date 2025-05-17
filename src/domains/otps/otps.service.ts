import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateOtpDto } from 'domains/otps/dto/create-otp.dto'
import { Otp } from 'domains/otps/schemas/otp.schema'
import { Model } from 'mongoose'

@Injectable()
export class OtpsService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  async create(createOtpDto: CreateOtpDto) {
    const { email, otp } = createOtpDto
    const optDocument = await this.otpModel.findOne({ otp })
    // When user send OTP multiple times
    if (optDocument !== null) {
      return this.otpModel.updateOne({ email }, { otp })
    }
    return this.otpModel.create(createOtpDto)
  }

  async findOtpCodeByUserEmail(email: string) {
    return await this.otpModel.findOne({ email })
  }

  async removeOtpByEmail(email: string) {
    return await this.otpModel.deleteOne({ email })
  }
}
