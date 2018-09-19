import { User } from "./user.model";
import { Appointment } from "./appointment.model";

export interface Patient extends User {
    medicare: string,
    appointments?: Appointment[],
};