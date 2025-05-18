"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodOptions = exports.PaymentMethod = exports.orderStatusOptions = exports.OrderStatus = exports.discountTypeOptions = exports.DiscountType = exports.ProductStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Customer"] = "Customer";
    Role["Admin"] = "Admin";
})(Role || (exports.Role = Role = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["Published"] = "Published";
    ProductStatus["Draft"] = "Draft";
    ProductStatus["Archived"] = "Archived";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType[DiscountType["None"] = 0] = "None";
    DiscountType[DiscountType["Percentage"] = 1] = "Percentage";
    DiscountType[DiscountType["FixedAmount"] = 2] = "FixedAmount";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
exports.discountTypeOptions = Object.entries(DiscountType)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(([key, value]) => `${value} (${key})`)
    .join(' || ');
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PROCESSING"] = 0] = "PROCESSING";
    OrderStatus[OrderStatus["PENDING_PAYMENT"] = 1] = "PENDING_PAYMENT";
    OrderStatus[OrderStatus["PACKED"] = 2] = "PACKED";
    OrderStatus[OrderStatus["SHIPPED"] = 3] = "SHIPPED";
    OrderStatus[OrderStatus["DELIVERED"] = 4] = "DELIVERED";
    OrderStatus[OrderStatus["COMPLETED"] = 5] = "COMPLETED";
    OrderStatus[OrderStatus["RETURNED"] = 6] = "RETURNED";
    OrderStatus[OrderStatus["CANCELED"] = 7] = "CANCELED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
exports.orderStatusOptions = Object.entries(OrderStatus)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(([key, value]) => `${value} (${key})`)
    .join(' || ');
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["COD"] = 0] = "COD";
    PaymentMethod[PaymentMethod["BANKING"] = 1] = "BANKING";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
exports.paymentMethodOptions = Object.entries(PaymentMethod)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(([key, value]) => `${value} (${key})`)
    .join(' || ');
//# sourceMappingURL=enum.js.map