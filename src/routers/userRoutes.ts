import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import userController from "../controllers/userControllers"
import { UserRegisterDTO, UserCredentialDTO } from "../dtos/userDTO"
 
const userRouter: Router = Router()

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => userController.getUserController(req, res, next))
userRouter.get("/:id", (req: Request<{id: string}>, res: Response, next: NextFunction) => userController.getUserById(req, res, next))
userRouter.post("/register", (req:Request<unknown,unknown,UserRegisterDTO>, res:Response , next: NextFunction) => userController.registerUserController(req, res, next))
userRouter.post("/login", (req:Request<unknown, unknown, UserCredentialDTO>, res:Response , next: NextFunction) => userController.loginUserController(req, res, next))

export default userRouter