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
exports.cancelAppointmentService = exports.registerAppointmentService = exports.getByIdAppointmentService = exports.getAppointmentService = void 0;
const Appointment_1 = require("../interfaces/Appointment");
const Appointment_Repository_1 = require("../repositories/Appointment.Repository");
const userServices_1 = require("./userServices");
const customError_1 = require("../utils/customError");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRespository.find();
    if (appointmentFound.length === 0)
        throw new customError_1.CustomError(404, `No se encontraron turnos.`);
    else
        return appointmentFound;
});
exports.getAppointmentService = getAppointmentService;
const getByIdAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRespository.findOne({
        where: { id: parseInt(id) }
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(404, `La cita con el id ${id} no fue encontrada!`);
    else
        return appointmentFound;
});
exports.getByIdAppointmentService = getByIdAppointmentService;
const registerAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    // Valida que el user con id "x" exista
    yield (0, userServices_1.getUserByIdService)(appointmentData.userId);
    Appointment_Repository_1.AppointmentRespository.validateAllowAppointment(appointmentData.date, appointmentData.time);
    yield Appointment_Repository_1.AppointmentRespository.validateExistingAppointment(appointmentData.userId, new Date(appointmentData.date), appointmentData.time);
    // Creo el nuevo turno
    const newAppointment = Appointment_Repository_1.AppointmentRespository.create({
        date: new Date(appointmentData.date),
        time: appointmentData.time,
        user: {
            id: appointmentData.userId
        }
    });
    // Retorno el turno
    return yield Appointment_Repository_1.AppointmentRespository.save(newAppointment);
});
exports.registerAppointmentService = registerAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRespository.findOne({
        where: { id: parseInt(id) }
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(404, `No existe el turno con id: ${id}`);
    appointmentFound.status = Appointment_1.Status.cancelled;
    yield Appointment_Repository_1.AppointmentRespository.save(appointmentFound);
});
exports.cancelAppointmentService = cancelAppointmentService;
