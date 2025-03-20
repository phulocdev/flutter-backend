import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Role } from 'core/constants/enum'
import * as mongoose from 'mongoose'

export type AccountDocument = mongoose.HydratedDocument<Account>

// Việc định nghĩa type cho các field có mục đích cho việc findAll() và findOne() mà thôi
// -> Giúp gọi đúng các method, fields của các kiểu dữ liệu ấy
// Định nghĩa type không giúp TS trong việc check dữ liệu của các trường tương ứng khi create() update()
// cho dù định nghĩa là string cho field a, nhưng mà lúc create() có thể thêm cho field a một Object thì TS cũng không báo lỗi
// -> khi create() update() thì nên phụ thuộc vào DTO, còn các biến thể tùy chọn khác phải do DEV tự xem xét

// Định nghĩa Type trong  @Prop({ type: String }) có tác dụng cast LẦN 1 trước khi để mongoose thêm vào collection
// Nếu k trùng type -> lỗi
// Sau đó nếu pass thì cast lần 2 tại chỗ định nghĩa type ở dưới nữa
// email: string -> Nếu k trùng type -> lỗi
// Lưu ý: nếu là number thì nó có thể auto cast trang string nha
@Schema({ timestamps: true, versionKey: false, collection: 'Accounts' })
export class Account {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId

  @Prop({ required: true, index: true, unique: true, type: String })
  email: string

  @Prop({ required: true, type: String })
  password: string

  @Prop({ required: true, type: String })
  fullName: string

  // Khi mà thêm ? ở thuộc tính avatarUrl ở dưới thì chỉ có tác dụng để cho DEV hiểu rằng là khi create() thì có thể thêm trường đó
  // hoặc không thêm
  @Prop({ required: false, type: String, default: '' })
  avatarUrl: string
  // avatarUrl?: string

  @Prop({ required: false, type: String, default: '' })
  address: string

  @Prop({ required: false, type: String, enum: Role, default: Role.Customer })
  role: Role

  @Prop({ required: false, type: String, default: '' })
  refreshToken: string
}

export const AccountSchema = SchemaFactory.createForClass(Account)
