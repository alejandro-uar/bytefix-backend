import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential.entity";
import { Repository } from "typeorm";

export const CredentialRepository: Repository<Credential> = AppDataSource.getRepository(Credential)