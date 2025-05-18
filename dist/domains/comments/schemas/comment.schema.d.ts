import mongoose from 'mongoose';
export type CommentDocument = mongoose.HydratedDocument<Comment>;
export declare class Comment {
    productId: mongoose.Types.ObjectId;
    accountId: mongoose.Types.ObjectId;
    content: string;
    name?: string;
    stars: number;
    email?: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Comment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
