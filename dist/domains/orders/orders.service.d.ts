import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { AccountType, ISku } from 'core/types/type';
import { CreateOrderDto } from 'domains/orders/dto/create-order.dto';
import { OrderQueryDto } from 'domains/orders/dto/order-query.dto';
import { UpdateOrderDto } from 'domains/orders/dto/update-order.dto';
import { OrderItem } from 'domains/orders/schemas/order-item.schema';
import { Order } from 'domains/orders/schemas/order.schema';
import { ProductsService } from 'domains/products/products.service';
import mongoose, { Model, Types } from 'mongoose';
export declare class OrdersService {
    private readonly orderModel;
    private readonly orderItemModel;
    private readonly productsService;
    constructor(orderModel: Model<Order>, orderItemModel: Model<OrderItem>, productsService: ProductsService);
    create(createOrderDto: CreateOrderDto): Promise<mongoose.Document<unknown, {}, Order> & Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & OrderQueryDto): Promise<{
        data: (mongoose.Document<unknown, {}, Order> & Order & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPages: number;
            totalDocuments: number;
        };
    }>;
    findAllByCustomer(qs: PaginationQueryDto, account: AccountType): Promise<{
        data: (mongoose.Document<unknown, {}, Order> & Order & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPages: number;
            totalDocuments: number;
        };
    }>;
    findOrderDoc(id: string): Promise<mongoose.Document<unknown, {}, Order> & Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<{
        sku: ISku;
        order: Types.ObjectId;
        quantity: number;
        sellingPrice: number;
        costPrice: number;
        createdAt?: string;
        updatedAt?: string;
        _id: Types.ObjectId;
        __v: number;
    }[]>;
    update(_id: string, updateOrderDto: UpdateOrderDto, account: AccountType): Promise<mongoose.Document<unknown, {}, Order> & Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(_id: string): Promise<{
        deleted: boolean;
    }>;
    bulkRemove(ids: string[]): Promise<{
        deleted: boolean;
    }>;
}
