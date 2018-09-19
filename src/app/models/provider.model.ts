import { User } from "./user.model";
import { RatedModel } from './rated_model.model';
import { Appointment } from "./appointment.model";

export interface Provider extends User, RatedModel {
    health_centre_id: string|number,
    health_centre_name: string,
    provider_type: string,
    provider_number: string,
    appointments: Appointment[],
}

export let ProviderTypes: string[] = [
    'General Practitioner', 
    'Physiotherapist',
    'Pathologist',
    'Pharmacist',
];