"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res, next) => userControllers_1.default.getUserController(req, res, next));
userRouter.get("/:id", (req, res, next) => userControllers_1.default.getUserById(req, res, next));
userRouter.post("/register", (req, res, next) => userControllers_1.default.registerUserController(req, res, next));
userRouter.post("/login", (req, res, next) => userControllers_1.default.loginUserController(req, res, next));
exports.default = userRouter;
