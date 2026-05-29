import { AppointmentRegisterDTO } from "../dtos/appointmentDTO"
import { Status } from "../interfaces/Appointment"
import { AppointmentRespository } from "../repositories/Appointment.Repository";
import { getUserByIdService } from "./userServices";
import { Appointment } from "../entities/Appointment.entity";
import { CustomError } from "../utils/customError";


export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointmentFound: Appointment[] = await AppointmentRespository.find()
    if(appointmentFound.length === 0) throw new CustomError(404, `No se encontraron turnos.`)
    else return appointmentFound
}

export const getByIdAppointmentService = async (id: string): Promise<Appointment | null> => {
    const appointmentFound: Appointment | null = await AppointmentRespository.findOne({
        where:{id: parseInt(id)}
    })
    if(!appointmentFound) throw new CustomError(404,`La cita con el id ${id} no fue encontrada!`)
    else return appointmentFound
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDTO): Promise<Appointment> => {
    
    // Valida que el user con id "x" exista
    await getUserByIdService(appointmentData.userId);
    
    AppointmentRespository.validateAllowAppointment(appointmentData.date, appointmentData.time)
    await AppointmentRespository.validateExistingAppointment(appointmentData.userId, new Date(appointmentData.date), appointmentData.time)

    // Creo el nuevo turno
    const newAppointment = AppointmentRespository.create({
        date: new Date(appointmentData.date),
        time: appointmentData.time,
        user: {
            id: appointmentData.userId
        }
    })
    // Retorno el turno
    return await AppointmentRespository.save(newAppointment)
    
};

export const cancelAppointmentService = async (id: string): Promise<void> => {
    const appointmentFound = await AppointmentRespository.findOne({
        where:{id: parseInt(id)}
    })
    if(!appointmentFound) throw new CustomError(404,`No existe el turno con id: ${id}`);
    appointmentFound.status = Status.cancelled;
    await AppointmentRespository.save(appointmentFound)
}