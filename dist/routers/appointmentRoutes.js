"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsControllers_1 = __importDefault(require("../controllers/appointmentsControllers"));
const appointmentRouter = (0, express_1.Router)();
appointmentRouter.get("/", (req, res, next) => appointmentsControllers_1.default.getAppointmentController(req, res, next));
appointmentRouter.get("/:id", (req, res, next) => appointmentsControllers_1.default.getByIdAppointmentController(req, res, next));
appointmentRouter.post("/schedule", (req, res, next) => appointmentsControllers_1.default.registerAppointmentController(req, res, next));
appointmentRouter.put("/cancel/:id", (req, res, next) => appointmentsControllers_1.default.cancelAppointmentController(req, res, next));
exports.default = appointmentRouter;
