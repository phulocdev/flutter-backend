export declare enum Role {
    Customer = "Customer",
    Admin = "Admin"
}
export declare enum ProductStatus {
    Published = "Published",
    Draft = "Draft",
    Archived = "Archived"
}
export declare enum DiscountType {
    None = 0,
    Percentage = 1,
    FixedAmount = 2
}
export declare const discountTypeOptions: string;
export declare enum OrderStatus {
    PROCESSING = 0,
    PENDING_PAYMENT = 1,
    PACKED = 2,
    SHIPPED = 3,
    DELIVERED = 4,
    COMPLETED = 5,
    RETURNED = 6,
    CANCELED = 7
}
export declare const orderStatusOptions: string;
export declare enum PaymentMethod {
    COD = 0,
    BANKING = 1
}
export declare const paymentMethodOptions: string;
