import dotenv from 'dotenv'
import server from './server'

dotenv.config()

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`Desde REST-API ${port}, haz click http://localhost:${port}`)
})
