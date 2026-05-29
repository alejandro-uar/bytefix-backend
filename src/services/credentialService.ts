import { CredentialRepository } from "../repositories/Credential.Repository";
import { Credential } from "../entities/Credential.entity";
import { CustomError } from "../utils/customError";

// Buscamos si dentro de las credenciales existe un usuario con el username
const checkUserExist = async (username: string): Promise<void> => {
    const credentialFound: Credential|null = await CredentialRepository.findOne({where:{username}})
    if(credentialFound) throw new CustomError(400,`El usuario con username: ${username} ya existe! intente con otro.`)
}

// Create credential y return el id de la credencial creada
export const getCredentialService = async (user: string, password: string): Promise<Credential> => {

    // Realizar algun proceso de encriptacion con la password antes de guardala.

    // Checkeo que no exista igualdad entre los nombres de usuarios antes de cargarlo.
    await checkUserExist(user);
    
    const newCredential: Credential = CredentialRepository.create({
        username: user,
        password: password // este debe ser el encriptado!
    })
    return await CredentialRepository.save(newCredential)
};


export const checkUserCredential = async (user: string, password:string): Promise<number|undefined> => {
    const credentialFound: Credential|null = await CredentialRepository.findOne({where:{username: user}})
    if(!credentialFound) throw new CustomError(400,`Usuario o contraseña incorrectos`)
    else{
        if(credentialFound?.password != password) throw new CustomError(400,`Usuario o contraseña incorrectos`) 
        else return credentialFound.id
    } 
}
