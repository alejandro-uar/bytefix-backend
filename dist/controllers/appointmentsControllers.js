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
const appointmentServices_1 = require("../services/appointmentServices");
const catchingErrors_1 = require("../utils/catchingErrors");
const getAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, appointmentServices_1.getAppointmentService)();
    res.status(200).json(serviceResponse);
});
const getByIdAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceResponse = yield (0, appointmentServices_1.getByIdAppointmentService)(id);
    res.status(200).json(serviceResponse);
});
const registerAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = req.body;
    const serviceResponse = yield (0, appointmentServices_1.registerAppointmentService)({ date, time, userId });
    res.status(201).json({
        message: "Turno agendado con exito!",
    });
});
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceResponse = yield (0, appointmentServices_1.cancelAppointmentService)(id);
    res.status(200).json({
        message: "Turno cancelado con exito!"
    });
});
const appointmentController = {
    getAppointmentController: (0, catchingErrors_1.catchingsErrors)(getAppointmentController),
    getByIdAppointmentController: (0, catchingErrors_1.catchingsErrors)(getByIdAppointmentController),
    registerAppointmentController: (0, catchingErrors_1.catchingsErrors)(registerAppointmentController),
    cancelAppointmentController: (0, catchingErrors_1.catchingsErrors)(cancelAppointmentController)
};
exports.default = appointmentController;
