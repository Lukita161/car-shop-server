import mongoose from "mongoose";
const url = 'mongodb+srv://caularase:MWiqORk6xElBh14M@car-manager-api.wga4b.mongodb.net/?retryWrites=true&w=majority&appName=car-manager-api'
export default async function connectDb() {
    try {
        await mongoose.connect(url)
        console.log('Connection succesfull')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}