export interface Appointment {
    id: number;
    date: Date;
    time: string;
    status: Status;
    userId: number;
}

export enum Status {
    active = "active",
    cancelled = "cancelled"
}
