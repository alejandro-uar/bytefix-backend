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
exports.AppointmentRespository = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_entity_1 = require("../entities/Appointment.entity");
exports.AppointmentRespository = data_source_1.AppDataSource.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const today = new Date();
        //Citas para fechas pasadas ✔DONE
        const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowInArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        if (appointmentDateArg < nowInArg)
            throw new Error(`No se puede agendar citas para fechas pasadas!`);
        //Citas con menos de 24hs     
        const diffMiliSeconds = today.getTime() - appointmentDate.getTime();
        const diffHours = diffMiliSeconds / (1000 * 60 * 60);
        if (diffHours > 24)
            throw new Error(`Las citas deben agendarse con al menos 24 horas de antelacion`);
        //Citas para los fines de semanas ✔DONE
        const dayOnWeek = appointmentDateArg.getUTCDay();
        if (dayOnWeek === 5 || dayOnWeek === 6)
            throw new Error(`No se puede angendar citas los fines de semanas`);
        //Citas dentro del uso horario 08:00 - 18:00 ✔DONE
        if (hours < 8 || hours > 18)
            throw new Error(`Las citas deben agendarse entre las 8am y las 18pm`);
    },
    validateExistingAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentFound = yield this.findOne({
                where: { user: { id: userId }, time: time, date: date }
            });
            console.log(appointmentFound);
            if (appointmentFound)
                throw new Error(`La cita con fecha ${date} y hora ${time} ya existe! para el usario con id ${userId}`);
        });
    }
});
