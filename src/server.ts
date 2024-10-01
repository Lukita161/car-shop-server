import express from 'express'
import morgan from 'morgan'
import connectDb from './db'
import CarRouter from './routes/CarRouter'
import AdminRouter from './routes/AdminRouter'

connectDb()
const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/cars', CarRouter)
app.use('/admin', AdminRouter)

export default app
