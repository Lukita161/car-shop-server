import mongoose from "mongoose";

export default async function connectDb() {
    try {
        await mongoose.connect(process.env.MOONGOSE_CONNECTION)
        console.log('Connection succesfull')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}