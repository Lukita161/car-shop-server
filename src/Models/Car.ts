import mongoose, { Model, Types, Schema, Document } from "mongoose"

type CarI = Document & {
    carName: string,
    mark: string,
    price: number
}

const CarSchema : Schema = new Schema<CarI>({
    carName: {
        type: String,
        required: true,
    },
    mark: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
})
const CarModel = mongoose.model<CarI>('Car', CarSchema)

export default CarModel