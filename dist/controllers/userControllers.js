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
const userServices_1 = require("../services/userServices");
const catchingErrors_1 = require("../utils/catchingErrors");
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, userServices_1.getUserService)();
    res.status(200).json({
        message: "Obtener todos los usuarios",
        data: data
    });
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield (0, userServices_1.getUserByIdService)(parseInt(id, 10));
    res.status(200).json(data);
});
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, userServices_1.registerUserService)(req.body);
    res.status(201).json({
        message: "Usuario creado con exito.",
        data: serviceResponse
    });
});
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, userServices_1.loginUserService)(req.body);
    res.status(200).json(serviceResponse);
});
const userController = {
    getUserController: (0, catchingErrors_1.catchingsErrors)(getUserController),
    getUserById: (0, catchingErrors_1.catchingsErrors)(getUserById),
    registerUserController: (0, catchingErrors_1.catchingsErrors)(registerUserController),
    loginUserController: (0, catchingErrors_1.catchingsErrors)(loginUserController)
};
exports.default = userController;
