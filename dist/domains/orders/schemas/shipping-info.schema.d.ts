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
export declare class ShippingInfo {
    name: string;
    email: string;
    phoneNumber: string;
    province: string;
    district: string;
    ward: string;
    detailedAddress: string;
}
export declare const ShippingInfoSchema: import("mongoose").Schema<ShippingInfo, import("mongoose").Model<ShippingInfo, any, any, any, import("mongoose").Document<unknown, any, ShippingInfo> & ShippingInfo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShippingInfo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ShippingInfo>> & import("mongoose").FlatRecord<ShippingInfo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
