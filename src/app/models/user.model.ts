export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    phone: string,
    type?: string,
    is_admin: boolean,
    is_patient: boolean,
    is_provider: boolean,
};