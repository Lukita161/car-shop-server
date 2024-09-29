import mongoose, { Document, Schema } from "mongoose";

type AdminType = Document & {
    email: string,
    password: string,
    userName: string,
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
    }
})

export const AdminModel = mongoose.model<AdminType>('Admin', AdminSchema)