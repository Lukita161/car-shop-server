import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDb from './db'
import CarRouter from './routes/CarRouter'
import AdminRouter from './routes/AdminRouter'
import { corsOptions } from './config/corsConfig'

connectDb()
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/cars', CarRouter)
app.use('/admin', AdminRouter)

export default app
