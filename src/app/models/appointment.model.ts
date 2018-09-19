export interface Appointment {
    id: string,
    patient_id: string,
    patient_name?: string,
    provider_id: string,
    provider_name?: string,
    start_time: string,
    end_time: string,
    reason: string,
    comment: string,
};