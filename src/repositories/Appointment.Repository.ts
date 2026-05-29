import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { Repository } from "typeorm";

export const AppointmentRespository = AppDataSource.getRepository(Appointment).extend({
    validateAllowAppointment: function(date: Date, time: string){
        
        const [hours, minutes] =  time.split(":").map(Number)

        const appointmentDate = new Date(date)
        appointmentDate.setHours(hours, minutes, 0)
        const today = new Date()

        
        //Citas para fechas pasadas ✔DONE
        const appointmentDateArg = new Date(appointmentDate.getTime() -3 *60 *60 *1000)
        const nowInArg = new Date(new Date().getTime() -3 *60 *60 *1000 )
        if(appointmentDateArg < nowInArg) throw new Error(`No se puede agendar citas para fechas pasadas!`)
            
        //Citas con menos de 24hs     
        const diffMiliSeconds = today.getTime() - appointmentDate.getTime()
        const diffHours = diffMiliSeconds / (1000 * 60 *60)
        if(diffHours > 24) throw new Error(`Las citas deben agendarse con al menos 24 horas de antelacion`)

        //Citas para los fines de semanas ✔DONE
        const dayOnWeek = appointmentDateArg.getUTCDay()
        if(dayOnWeek === 5 || dayOnWeek === 6) throw new Error(`No se puede angendar citas los fines de semanas`)            

        //Citas dentro del uso horario 08:00 - 18:00 ✔DONE
        if(hours < 8 || hours > 18) throw new Error(`Las citas deben agendarse entre las 8am y las 18pm`)    
    },

    validateExistingAppointment: async function(userId: number, date: Date, time: string): Promise<void>{
        const appointmentFound = await this.findOne({
            where: { user: {id: userId}, time:time, date:date }
        })
        console.log(appointmentFound)
        if(appointmentFound) throw new Error(`La cita con fecha ${date} y hora ${time} ya existe! para el usario con id ${userId}`)
    }
})   