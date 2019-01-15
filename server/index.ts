import express, { Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'

const PORT = process.env.PORT
const server = express()

; (async() => {
    server.use(helmet())
    server.use(cors())
    server.use(express.static('public'))

    // Set the access options for the app.
    server.use((req: express.Request, res: express.Response, next: express.NextFunction): void | Response => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        if (req.method === 'OPTIONS') {
            res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }

        next()
    })

    server.listen(PORT)
})()
