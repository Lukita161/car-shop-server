import mongoose, { Document } from "mongoose";
type AdminType = Document & {
    email: string;
    password: string;
    userName: string;
    isTheOwner: boolean;
};
export declare const AdminModel: mongoose.Model<AdminType, {}, {}, {}, mongoose.Document<unknown, {}, AdminType> & mongoose.Document<unknown, any, any> & {
    email: string;
    password: string;
    userName: string;
    isTheOwner: boolean;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
