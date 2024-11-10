import mongoose, { Document } from "mongoose";
type CarI = Document & {
    carName: string;
    brand: string;
    description: string;
    image: string[];
    price: number;
    availability: boolean;
};
export declare const brand: string[];
declare const CarModel: mongoose.Model<CarI, {}, {}, {}, mongoose.Document<unknown, {}, CarI> & mongoose.Document<unknown, any, any> & {
    carName: string;
    brand: string;
    description: string;
    image: string[];
    price: number;
    availability: boolean;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default CarModel;
