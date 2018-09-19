import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { API_URL, JSONToUrlEncoded, OPTIONS } from './api.config';

import { Patient } from '../models/patient.model';
import { Provider } from '../models/provider.model';
import { HealthCentre } from '../models/health_centre.model';
import { Appointment } from '../models/appointment.model';
import { HealthCentreRating } from '../models/health_centre_rating.model';
import { ProviderRating } from '../models/provider_rating.model';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    // patients
    getPatients(): Observable<Patient[]> {
        return this.http
            .get<Patient[]>(`${API_URL}/patients`, OPTIONS);
    }

    addPatient(patient: Patient): Observable<Patient> {
        return this.http
            .post<Patient>(`${API_URL}/patients`, JSONToUrlEncoded(patient), OPTIONS)
    }

    getPatient(id: number|string): Observable<Patient> {
        return this.http
            .get<Patient>(`${API_URL}/patients/${id}`, OPTIONS);
    }

    deletePatient(id: number|string): Observable<any> {
        return this.http
            .delete<any>(`${API_URL}/patients/${id}`, OPTIONS);
    }

    patchPatient(id: number|string, data: any): Observable<Patient> {
        return this.http
            .patch<Patient>(`${API_URL}/patients/${id}`, JSONToUrlEncoded(data), OPTIONS);
    }

    // providers
    getProviders(): Observable<Provider[]> {
        return this.http
            .get<Provider[]>(`${API_URL}/providers`, OPTIONS);
    }

    addProvider(provider: Provider): Observable<Provider> {
        return this.http
            .post<Provider>(`${API_URL}/providers`, JSONToUrlEncoded(provider), OPTIONS);
    }

    getProvider(id: number|string): Observable<Provider> {
        return this.http
            .get<Provider>(`${API_URL}/providers/${id}`, OPTIONS);
    }

    deleteProvider(id: number|string): Observable<any> {
        return this.http
            .delete<any>(`${API_URL}/providers/${id}`, OPTIONS);
    }

    patchProvider(id: number|string, data: any): Observable<Provider> {
        return this.http
            .patch<Provider>(`${API_URL}/providers/${id}`, JSONToUrlEncoded(data), OPTIONS);
    }

    // health centres
    getHealthCentres(): Observable<HealthCentre[]> {
        return this.http
            .get<HealthCentre[]>(`${API_URL}/health_centres`, OPTIONS);
    }

    addHealthCentre(health_centre: HealthCentre): Observable<HealthCentre> {
        return this.http
            .post<HealthCentre>(`${API_URL}/health_centres`, JSONToUrlEncoded(health_centre), OPTIONS);
    }

    getHealthCentre(id: number|string): Observable<HealthCentre> {
        return this.http
            .get<HealthCentre>(`${API_URL}/health_centres/${id}`, OPTIONS);
    }

    deleteHealthCentre(id: number|string): Observable<any> {
        return this.http
            .delete<any>(`${API_URL}/health_centres/${id}`, OPTIONS);
    }

    patchHealthCentre(id: number|string, data: any): Observable<HealthCentre> {
        return this.http
            .patch<HealthCentre>(`${API_URL}/health_centres/${id}`, JSONToUrlEncoded(data), OPTIONS);
    }

    // appointments
    getAppointments(): Observable<Appointment[]> {
        return this.http
            .get<Appointment[]>(`${API_URL}/appointments`, OPTIONS);
    }

    addAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http
            .post<Appointment>(`${API_URL}/appointments`, JSONToUrlEncoded(appointment), OPTIONS);
    }

    getAppointment(id: number|string): Observable<Appointment> {
        return this.http
            .get<Appointment>(`${API_URL}/appointments/${id}`, OPTIONS);
    }

    deleteAppointment(id: number|string): Observable<any> {
        return this.http
            .delete<any>(`${API_URL}/appointments/${id}`, OPTIONS);
    }

    patchAppointment(id: number|string, data: any): Observable<Appointment> {
        return this.http
            .patch<Appointment>(`${API_URL}/appointments/${id}`, JSONToUrlEncoded(data), OPTIONS);
    }

    // health centre ratings
    getHealthCentreRatings(): Observable<HealthCentreRating[]> {
        return this.http
            .get<HealthCentreRating[]>(`${API_URL}/health_centre_ratings`, OPTIONS);
    }

    addHealthCentreRating(health_centre_rating: HealthCentreRating): Observable<HealthCentreRating> {
        return this.http
            .post<HealthCentreRating>(`${API_URL}/health_centre_ratings`, JSONToUrlEncoded(health_centre_rating), OPTIONS);
    }

    getHealthCentreRating(id: number|string): Observable<HealthCentreRating> {
        return this.http
            .get<HealthCentreRating>(`${API_URL}/health_centre_ratings/${id}`, OPTIONS);
    }

    deleteHealthCentreRating(id: number|string): Observable<any> {
        return this.http
            .delete<any>(`${API_URL}/health_centre_ratings/${id}`, OPTIONS);
    }

    patchHealthCentreRating(id: number|string, data: any): Observable<HealthCentreRating> {
        return this.http
            .patch<HealthCentreRating>(`${API_URL}/health_centre_ratings/${id}`, JSONToUrlEncoded(data), OPTIONS);
    }

    // provider ratings
    getProviderRatings(): Observable<ProviderRating[]> {
        return this.http
            .get<ProviderRating[]>(`${API_URL}/provider_ratings`, OPTIONS);
    }

    addProviderRating(provider_rating: ProviderRating): Observable<ProviderRating> {
        return this.http
            .post<ProviderRating>(`${API_URL}/provider_ratings`, JSONToUrlEncoded(provider_rating), OPTIONS);
    }

    getProviderRating(id: number|string): Observable<ProviderRating> {
        return this.http
            .get<ProviderRating>(`${API_URL}/provider_ratings/${id}`, OPTIONS);
    }

    deleteProviderRating(id: number|string): Observable<any> {
        return this.http
            .delete<any>(`${API_URL}/provider_ratings/${id}`, OPTIONS);
    }

    patchProviderRating(id: number|string, data: any): Observable<ProviderRating> {
        return this.http
            .patch<ProviderRating>(`${API_URL}/provider_ratings/${id}`, JSONToUrlEncoded(data), OPTIONS);
    }
}
