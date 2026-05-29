import { Request, Response } from "express"
import { getUserService, getUserByIdService, registerUserService, loginUserService } from "../services/userServices"
import { UserCredentialDTO, UserDTO, UserLoginDTO, UserRegisterDTO } from "../dtos/userDTO"
import { User } from "../entities/User.entity"
import { checkUserCredential } from "../services/credentialService"
import { catchingsErrors } from "../utils/catchingErrors"

const getUserController = async (req: Request, res: Response): Promise<void> => {
    const data: UserDTO[] = await getUserService()
    res.status(200).json({
        message: "Obtener todos los usuarios",
        data: data
    })
}

const getUserById = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    const { id } = req.params
    const data: UserDTO = await getUserByIdService(parseInt(id, 10))
    res.status(200).json(data)
}


const registerUserController = async (req: Request<unknown,unknown,UserRegisterDTO>, res: Response): Promise<void> => {
    const serviceResponse: User = await registerUserService(req.body)
    res.status(201).json({
        message: "Usuario creado con exito.",
        data: serviceResponse
    })
}

const loginUserController = async (req:Request<unknown, unknown, UserCredentialDTO>, res:Response): Promise<void> => {
    const serviceResponse: UserLoginDTO = await loginUserService(req.body)
    res.status(200).json(serviceResponse)    
}

const userController = {
    getUserController: catchingsErrors(getUserController),
    getUserById: catchingsErrors(getUserById),
    registerUserController: catchingsErrors(registerUserController),
    loginUserController: catchingsErrors(loginUserController) 
}

export default userController