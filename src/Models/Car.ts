import mongoose, { Schema, Document } from "mongoose"

type CarI = Document & {
    carName: string,
    brand: string,
    description: string,
    image: string[],
    price: number,
    availability: boolean
}

export const brand = ['volkswagen', "kia" , 'ford', 'audi', 'bmw', 'renault', 'chevrolet']

const CarSchema : Schema = new Schema<CarI>({
    carName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
        enum: brand,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: false
    }],
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    }
})
const CarModel = mongoose.model<CarI>('Car', CarSchema)

export default CarModel