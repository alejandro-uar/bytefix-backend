import express ,{Application, Request,Response,NextFunction} from "express"
import router from "./routers/index"
import morgan from "morgan"
import cors from "cors"

import { ErrorResponse, PostgresError } from "./interfaces/ErrorInterface"


const server: Application = express()

server.use(express.json())
server.use(morgan("dev"))
server.use(cors())

server.use(router)

// Middleware error
server.use((err: unknown, req: Request, res: Response, next: NextFunction)=>{
    const error: PostgresError = err as PostgresError 
    const errorMessage: ErrorResponse = {
        message: "Error del servidor",
        details: err instanceof Error ? error.detail ? error.detail : err.message : "Error desconocido",
        code: error.code
    }
    if(error.code === 404) res.status(404).json({message: errorMessage.message, details: errorMessage.details})
    else res.status(400).json(errorMessage)
})

export default server