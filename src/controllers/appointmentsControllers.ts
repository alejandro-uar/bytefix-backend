import { Request, Response } from "express"
import { getAppointmentService, getByIdAppointmentService, registerAppointmentService, cancelAppointmentService } from "../services/appointmentServices"
import { AppointmentRegisterDTO } from "../dtos/appointmentDTO"
import { Appointment } from "../entities/Appointment.entity";
import { catchingsErrors } from "../utils/catchingErrors";



const getAppointmentController = async (req: Request, res: Response): Promise<void> => {
    const serviceResponse = await getAppointmentService();
    res.status(200).json(serviceResponse)
}

const getByIdAppointmentController = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    const { id } = req.params
    const serviceResponse = await getByIdAppointmentService(id)
    res.status(200).json(serviceResponse)
}

const registerAppointmentController = async (req:Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {  
    const { date,time,userId  } = req.body
    const serviceResponse: Appointment = await registerAppointmentService({ date,time,userId  })
    res.status(201).json({
        message: "Turno agendado con exito!",
    })
}

const cancelAppointmentController = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    const { id } = req.params
    const serviceResponse = await cancelAppointmentService(id)
    res.status(200).json({
        message: "Turno cancelado con exito!"
    })
}

const appointmentController = {
    getAppointmentController: catchingsErrors(getAppointmentController),
    getByIdAppointmentController: catchingsErrors(getByIdAppointmentController),
    registerAppointmentController: catchingsErrors(registerAppointmentController),
    cancelAppointmentController: catchingsErrors(cancelAppointmentController)
}

export default appointmentController