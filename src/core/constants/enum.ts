export enum Role {
  Customer = 'Customer',
  Admin = 'Admin'
}

export enum ProductStatus {
  Published = 'Published',
  Draft = 'Draft',
  Archived = 'Archived'
}

export enum DiscountType {
  None,
  Percentage,
  FixedAmount
}

export const discountTypeOptions = Object.entries(DiscountType)
  .filter(([_, value]) => !isNaN(Number(value)))
  .map(([key, value]) => `${value} (${key})`)
  .join(' || ')

export enum OrderStatus {
  PROCESSING = 0, // Chờ xác nhận
  PENDING_PAYMENT = 1, // Đã xác nhận
  PACKED = 2, // Đang chuẩn bị
  SHIPPED = 3, // Đang giao hàng
  DELIVERED = 4, // Đã giao hàng
  COMPLETED = 5, // Hoàn thành
  RETURNED = 6, // Đang hoàn trả
  CANCELED = 7 // Đã hủy
}

export const orderStatusOptions = Object.entries(OrderStatus)
  .filter(([_, value]) => !isNaN(Number(value)))
  .map(([key, value]) => `${value} (${key})`)
  .join(' || ')

export enum PaymentMethod {
  COD,
  BANKING
}

export const paymentMethodOptions = Object.entries(PaymentMethod)
  .filter(([_, value]) => !isNaN(Number(value)))
  .map(([key, value]) => `${value} (${key})`)
  .join(' || ')
