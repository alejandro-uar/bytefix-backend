import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./Credential.entity";
import { Appointment } from "./Appointment.entity";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length:100, nullable:false})
    name: string

    @Column({type: "varchar", length: 100, unique:true, nullable: false})
    email: string

    @Column({type: "date", nullable: false})
    birthdate: Date
    
    @Column({type: "integer", nullable: false})
    nDni: number

    // credentialsId -> Hago la relacion trayendo la Entidad Credential 1 a 1 y en formato cascade
    @OneToOne(()=>Credential, {cascade: true})
    @JoinColumn()
    credentials: Credential

    // 1 usuario puede tener N citas
    @OneToMany(()=>Appointment, appointment => appointment.user, {nullable: false})
    appointments: Appointment[]


    //extras  ? = opcionales
    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

}