import express from 'express'
import connectDb from './db'
import CarRouter from './routes/CarRouter'
connectDb()
const app = express()
app.use(express.json())

app.use('/api/cars', CarRouter)

export default app
