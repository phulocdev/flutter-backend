import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { BadRequestError, NotFoundError, UnprocessableEntityError } from 'core/exceptions/errors.exception'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { AccountQueryDto } from 'domains/accounts/dto/account-query.dto'
import { Account, AccountDocument } from 'domains/accounts/schemas/account.schema'
import mongoose, { Model } from 'mongoose'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { CreateGuestAccountDto } from 'domains/accounts/dto/create-account-guest.dto'
import { AccountType } from 'core/types/type'

@Injectable()
export class AccountsService {
  private saltRounds = 10
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async createForGuest(createGuestAccountDto: CreateGuestAccountDto): Promise<AccountType> {
    const hashedPassword = await this.hashPassword(Math.floor(Math.random() * 1000000).toString())

    const newGuestAccount = await this.accountModel.create({
      ...createGuestAccountDto,
      isGuest: true,
      password: hashedPassword
    })

    return {
      _id: newGuestAccount._id,
      avatarUrl: newGuestAccount.avatarUrl,
      email: newGuestAccount.email,
      fullName: newGuestAccount.fullName,
      role: newGuestAccount.role,
      address: newGuestAccount.address,
      phoneNumber: newGuestAccount.phoneNumber
    }
  }

  async create(createAccountDto: CreateAccountDto & { _id?: string }): Promise<AccountType> {
    const [accountWithEmail, hashedPassword] = await Promise.all([
      this.accountModel.findOne({ email: createAccountDto.email }),
      this.hashPassword(createAccountDto.password)
    ])

    if (accountWithEmail) {
      throw new BadRequestError('Email này đã tồn tại trên hệ thống')
    }

    const newAccount = await this.accountModel.create({
      ...createAccountDto,
      password: hashedPassword,
      _id: createAccountDto._id
    })

    return {
      _id: newAccount._id,
      email: newAccount.email,
      fullName: newAccount.fullName,
      avatarUrl: newAccount.avatarUrl,
      role: newAccount.role,
      address: newAccount.address,
      phoneNumber: newAccount.phoneNumber
    }
  }

  async findAll(qs: PaginationQueryDto & AccountQueryDto) {
    const { page, limit, sort: sortQuery, ...filter } = qs

    // sort: createdAt.desc || createdAt.asc
    let sort: Record<string, 1 | -1> = { createdAt: -1 }
    if (sortQuery) {
      const sortField = sortQuery.split('.')[0]
      const isDescending = sortQuery.split('.')[1] === 'desc'
      sort = isDescending ? { [sortField]: -1 } : { [sortField]: 1 }
    }

    // if (from || to) {
    //   filter.createdAt = {}
    //   if (from) filter.createdAt.$gte = from
    //   if (to) filter.createdAt.$lt = to
    // }

    const query = this.accountModel.find(filter).sort(sort)

    if (limit && page) {
      query.skip((page - 1) * limit).limit(limit)
    }

    const [data, totalDocuments] = await Promise.all([query, this.accountModel.countDocuments(filter)])

    return {
      data,
      meta: {
        page: page || 1,
        limit: limit || totalDocuments,
        totalPages: limit ? Math.ceil(totalDocuments / limit) : 1,
        totalDocuments
      }
    }
  }

  async findOne(id: string) {
    const account = await this.accountModel.findOne({ _id: id })
    if (!account) {
      throw new NotFoundError('Tài khoản không tồn tại')
    }

    return this.accountModel.findById(id)
  }

  findByEmail(email: string) {
    return this.accountModel.findOne({ email })
  }

  findByRefreshToken(refreshToken: string) {
    return this.accountModel.findOne({ refreshToken })
  }

  async findAccountByEmailAndPassword({ email, password }: { email: string; password: string }) {
    const account = await this.findByEmail(email)
    if (!account) return null

    const isMatchPassword = await this.comparePassword(password, account.password)
    return isMatchPassword ? account : null
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const { isChangeEmail, isChangePhoneNumber, email, phoneNumber } = updateAccountDto
    const account = await this.accountModel.findOne({ _id: id })

    if (isChangePhoneNumber) {
      const isExistAccountWithPhoneNumber = (await this.accountModel.findOne({ phoneNumber })) !== null
      if (isExistAccountWithPhoneNumber) {
        throw new BadRequestError('Số điện thoại này đã tồn tại')
      }
    }

    if (isChangeEmail) {
      const isExistAccountWithEmail = (await this.accountModel.findOne({ email })) !== null
      if (isExistAccountWithEmail) {
        throw new BadRequestError('Email này đã tồn tại')
      }
    }

    if (!account) {
      throw new NotFoundError('Tài khoản không tồn tại')
    }
    return this.accountModel.updateOne({ _id: id }, { ...updateAccountDto })
  }

  async findOneAndUpdateByEmail(email: string, updateAccountDto: UpdateAccountDto): Promise<AccountType> {
    const hashedPassword = await this.hashPassword(updateAccountDto.password)

    const updatedAccount = await this.accountModel.findOneAndUpdate(
      { email },
      { ...updateAccountDto, password: hashedPassword },
      { $new: true }
    )

    return {
      _id: updatedAccount._id,
      avatarUrl: updatedAccount.avatarUrl,
      email: updatedAccount.email,
      fullName: updatedAccount.fullName,
      role: updatedAccount.role,
      address: updatedAccount.address,
      phoneNumber: updatedAccount.phoneNumber
    }
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.accountModel.updateOne({ _id: id }, { refreshToken })
  }

  async updatePassword(id: string, password: string) {
    const hashedPassword = await this.hashPassword(password)
    return this.accountModel.updateOne(
      { _id: id },
      {
        password: hashedPassword
      }
    )
  }

  async updatePasswordByEmail(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password)
    return this.accountModel.updateOne(
      { email },
      {
        password: hashedPassword
      }
    )
  }

  async remove(id: string) {
    const account = await this.accountModel.findOne({ _id: id })
    if (!account) {
      throw new NotFoundError('Tài khoản không tồn tại')
    }
    return this.accountModel.deleteOne({ _id: id })
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds)
  }

  /**
   *
   * @param password mật khẩu ở dạng plain text
   * @param hashedPassword mật khẩu đã được mã hóa
   */
  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}
