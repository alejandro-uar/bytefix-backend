import { UserCredentialDTO, UserDTO, UserLoginDTO, UserRegisterDTO } from "../dtos/userDTO"
// import { User } from "../interfaces/User" Ahora remplazamos por la entity User
import { checkUserCredential, getCredentialService } from "./credentialService"
import { User } from "../entities/User.entity";
import { UserRepository } from "../repositories/User.Repository";
import { CustomError } from "../utils/customError";

// GET ALL USERS 
export const getUserService = async (): Promise<UserDTO[]> => {
    return await UserRepository.find()
}

// USER BY ID 
export const getUserByIdService = async (id: number): Promise<User> => {
   const userFound: User|null = await UserRepository.findOne({
        where:{ id: id},
        relations: ["appointments"]
   })  
   if(!userFound) throw new CustomError(404,`El usuario con id: ${id} no fue encontrado!`);
    return userFound; 
}

// CREATE USER 
export const registerUserService = async (user: UserRegisterDTO): Promise<User> => {
    const idCredentialUser = await getCredentialService(user.username, user.password);
    const newUser = UserRepository.create({
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.nDni,
        credentials: idCredentialUser
    })  
    return await UserRepository.save(newUser)
};

// LOGIN
export const loginUserService = async (userCredentials: UserCredentialDTO): Promise<UserLoginDTO> => {
    // Corroborar que existan las credenciales del usuer
   const credentialId: number|undefined = await checkUserCredential(userCredentials.username, userCredentials.password)
   // Buscar el user con las id de las credenciales obtenidas para traer sus datos y retornar.
   const userFound: User|null = await UserRepository.findOne({
        where: { credentials: { id: credentialId}} 
   })
   return {
        login: true,
        user: {
            id: userFound?.id,
            name: userFound?.name,
            email: userFound?.email,
            birthdate: userFound?.birthdate,
            nDni: userFound?.nDni
        }
   }
}