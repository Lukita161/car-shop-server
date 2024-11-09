import dotenv from 'dotenv'
dotenv.config()
const whitelist = [process.env.FRONTEND_URL, undefined]

export const corsOptions = {
    origin: function(origin, callback) {
    
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}