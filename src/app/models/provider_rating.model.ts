import { Rating } from './rating.model';

export interface ProviderRating extends Rating {
    patient_id: number,
    patient_name: string,
    provider_id: number,
    provider_name: string,
};