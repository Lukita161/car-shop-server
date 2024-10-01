import mongoose, { Document, Schema } from "mongoose";

type AdminType = Document & {
    email: string,
    password: string,
    userName: string,
    isTheOwner: boolean
}

const AdminSchema : Schema = new Schema<AdminType>({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    isTheOwner: {
        type: Boolean,
        default: false,
        required: false
    }
})

export const AdminModel = mongoose.model<AdminType>('Admin', AdminSchema)