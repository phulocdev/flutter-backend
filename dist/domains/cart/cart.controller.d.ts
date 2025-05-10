/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { CartService } from 'domains/cart/cart.service';
import { AddToCartDto } from 'domains/cart/dto/add-to-cart.dto';
import { AccountType } from 'core/types/type';
import { UpdateCartItemDto } from 'domains/cart/dto/update-cart-item.dto';
import { DeleteCartItemsDto } from 'domains/cart/dto/delete-cart-items.dto';
export declare class CartsController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(addToCartDto: AddToCartDto, account: AccountType): Promise<import("mongoose").UpdateWriteOpResult>;
    update(updateCartItemDto: UpdateCartItemDto, account: AccountType): Promise<import("mongoose").UpdateWriteOpResult>;
    findCart(account: AccountType): Promise<{
        sku: import("core/types/type").ISku;
        quantity: number;
        createdAt?: string;
        updatedAt?: string;
    }[]>;
    remove(deleteCartItemsDto: DeleteCartItemsDto, account: AccountType): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("./schemas/cart.schema").Cart> & import("./schemas/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schemas/cart.schema").Cart, "updateOne", {}>;
}
