// Solo levantamos el servidor

import server from "./server"
import { PORT } from "./config/envs"
import "reflect-metadata"
import { AppDataSource } from "./config/data-source"

AppDataSource.initialize()
    .then((res)=>{
        console.log(`Db connected successfully`)
        server.listen(PORT, () => {
            console.log(`Server listen port: ${PORT}`)
        })
    })
    .catch((error) => console.log(`Error: `, error))

