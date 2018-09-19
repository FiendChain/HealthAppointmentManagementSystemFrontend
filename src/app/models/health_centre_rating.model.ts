import { Rating } from './rating.model';

export interface HealthCentreRating extends Rating {
    patient_id: number,
    patient_name: string,
    health_centre_id: number,
    health_centre_name: string,
}