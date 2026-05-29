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
exports.checkUserCredential = exports.getCredentialService = void 0;
const Credential_Repository_1 = require("../repositories/Credential.Repository");
const customError_1 = require("../utils/customError");
// Buscamos si dentro de las credenciales existe un usuario con el username
const checkUserExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield Credential_Repository_1.CredentialRepository.findOne({ where: { username } });
    if (credentialFound)
        throw new customError_1.CustomError(400, `El usuario con username: ${username} ya existe! intente con otro.`);
});
// Create credential y return el id de la credencial creada
const getCredentialService = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Realizar algun proceso de encriptacion con la password antes de guardala.
    // Checkeo que no exista igualdad entre los nombres de usuarios antes de cargarlo.
    yield checkUserExist(user);
    const newCredential = Credential_Repository_1.CredentialRepository.create({
        username: user,
        password: password // este debe ser el encriptado!
    });
    return yield Credential_Repository_1.CredentialRepository.save(newCredential);
});
exports.getCredentialService = getCredentialService;
const checkUserCredential = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield Credential_Repository_1.CredentialRepository.findOne({ where: { username: user } });
    if (!credentialFound)
        throw new customError_1.CustomError(400, `Usuario o contraseña incorrectos`);
    else {
        if ((credentialFound === null || credentialFound === void 0 ? void 0 : credentialFound.password) != password)
            throw new customError_1.CustomError(400, `Usuario o contraseña incorrectos`);
        else
            return credentialFound.id;
    }
});
exports.checkUserCredential = checkUserCredential;
