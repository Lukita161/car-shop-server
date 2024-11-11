import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDb from './db'
import CarRouter from './routes/CarRouter'
import AdminRouter from './routes/AdminRouter'
import { corsOptions } from './config/corsConfig'
import publicRouter from './routes/CarPublicRouter'

connectDb()
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/cars', CarRouter)
app.use('/admin', AdminRouter)
app.get('/healt', (req, res)=> {
    res.status(200).json({data: 'Server is running'})
})
app.use('/api/public/cars', publicRouter)
export default app
