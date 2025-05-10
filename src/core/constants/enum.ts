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
  PROCESSING,
  PENDING_PAYMENT,
  PAID,
  PACKED,
  SHIPPED,
  READY_TO_SHIP,
  COMPLETED,
  CANCELED,
  RETURNED,
  DELIVERED
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
