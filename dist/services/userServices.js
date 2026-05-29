"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
// import { User } from "../interfaces/User" Ahora remplazamos por la entity User
const credentialService_1 = require("./credentialService");
const User_Repository_1 = require("../repositories/User.Repository");
const customError_1 = require("../utils/customError");
// GET ALL USERS 
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_Repository_1.UserRepository.find();
});
exports.getUserService = getUserService;
// USER BY ID 
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: { id: id },
        relations: ["appointments"]
    });
    if (!userFound)
        throw new customError_1.CustomError(404, `El usuario con id: ${id} no fue encontrado!`);
    return userFound;
});
exports.getUserByIdService = getUserByIdService;
// CREATE USER 
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const idCredentialUser = yield (0, credentialService_1.getCredentialService)(user.username, user.password);
    const newUser = User_Repository_1.UserRepository.create({
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.nDni,
        credentials: idCredentialUser
    });
    return yield User_Repository_1.UserRepository.save(newUser);
});
exports.registerUserService = registerUserService;
// LOGIN
const loginUserService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    // Corroborar que existan las credenciales del usuer
    const credentialId = yield (0, credentialService_1.checkUserCredential)(userCredentials.username, userCredentials.password);
    // Buscar el user con las id de las credenciales obtenidas para traer sus datos y retornar.
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: { credentials: { id: credentialId } }
    });
    return {
        login: true,
        user: {
            id: userFound === null || userFound === void 0 ? void 0 : userFound.id,
            name: userFound === null || userFound === void 0 ? void 0 : userFound.name,
            email: userFound === null || userFound === void 0 ? void 0 : userFound.email,
            birthdate: userFound === null || userFound === void 0 ? void 0 : userFound.birthdate,
            nDni: userFound === null || userFound === void 0 ? void 0 : userFound.nDni
        }
    };
});
exports.loginUserService = loginUserService;
