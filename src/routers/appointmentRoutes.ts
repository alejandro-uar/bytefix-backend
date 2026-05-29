import { Router, Request, Response, NextFunction } from "express";
import appointmentController from "../controllers/appointmentsControllers";
import { AppointmentRegisterDTO } from "../dtos/appointmentDTO";

const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req:Request, res:Response, next: NextFunction) => appointmentController.getAppointmentController(req, res, next))
appointmentRouter.get("/:id", (req: Request<{id: string}>, res: Response, next: NextFunction) => appointmentController.getByIdAppointmentController(req, res, next))
appointmentRouter.post("/schedule", (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response, next: NextFunction) => appointmentController.registerAppointmentController(req, res, next));
appointmentRouter.put("/cancel/:id", (req:Request<{id: string}>, res:Response, next: NextFunction) => appointmentController.cancelAppointmentController(req, res, next)) 

export default appointmentRouter;