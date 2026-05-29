import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { Repository } from "typeorm";

// Poder treaer esos datos de las entidades o tablas de la bd
export const UserRepository: Repository<User> = AppDataSource.getRepository(User)
