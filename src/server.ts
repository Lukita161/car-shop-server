import express from 'express'
import connectDb from './db'
import CarRouter from './routes/CarRouter'
import AdminRouter from './routes/AdminRouter'

connectDb()
const app = express()
app.use(express.json())

app.use('/api/cars', CarRouter)
app.use('/admin', AdminRouter)

export default app
