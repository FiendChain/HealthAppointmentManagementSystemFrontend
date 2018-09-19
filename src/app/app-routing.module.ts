import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginForm } from './components/login/login-form/login-form.component';
import { PatientList } from './components/patients/patient-list/patient-list.component';
import { PatientProfile } from './components/patients/patient-profile/patient-profile.component';
import { ProviderList } from './components/providers/provider-list/provider-list.component';
import { ProviderProfile } from './components/providers/provider-profile/provider-profile.component';
import { HealthCentreList } from './components/health-centres/health-centre-list/health-centre-list.component';
import { HealthCentreProfile } from './components/health-centres/health-centre-profile/health-centre-profile.component';
import { AppBrowserComponent } from './app-browser/app-browser.component';
import { RegisterFormPatient } from './components/login/register-form-patient/register-form-patient.component';
import { RegisterFormProvider } from './components/login/register-form-provider/register-form-provider.component';
import { AppointmentBrowser } from './components/appointments/appointment-browser/appointment-browser.component';
import { HealthCentreBrowser } from './components/health-centres/health-centre-browser/health-centre-browser.component';
import { PatientBrowser } from './components/patients/patient-browser/patient-browser.component';
import { ProviderBrowser } from './components/providers/provider-browser/provider-browser.component';
import { RatingsBrowser } from './components/ratings/ratings-browser/ratings-browser.component';


const routes: Routes = [
    { path: 'login', component: LoginForm, data: {state: 'login'} },
    { path: 'register', redirectTo: '/register_patient', pathMatch: 'full' },
    { path: 'register_patient', component: RegisterFormPatient, data: {state: 'register_patient'} },
    { path: 'register_provider', component: RegisterFormProvider, data: {state: 'register_provider'} },
    { path: '', component: AppBrowserComponent, data: {state: 'dashboard'}, children: [
        { path: 'appointments', component: AppointmentBrowser, data: {state: 'appointment_list'} },
        { path: 'patients', component: PatientBrowser, data: {state: 'patient_list'} },
        { path: 'patients/:id', component: PatientProfile, data: {state: 'patient_profile'} },
        { path: 'providers', component: ProviderBrowser, data: {state: 'provider_list'} },
        { path: 'providers/:id', component: ProviderProfile, data: {state: 'provider_profile'} },
        { path: 'health_centres', component: HealthCentreBrowser, data: {state: 'health_centre_list'} },
        { path: 'health_centres/:id', component: HealthCentreProfile, data: {state: 'health_centre_profile'} },
        { path: 'ratings', component: RatingsBrowser, data: {state: 'ratings_browser'}, },
    ]},
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class RoutingModule {}