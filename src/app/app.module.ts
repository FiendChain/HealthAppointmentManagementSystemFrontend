import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// services
import { ApiErrorHandler } from './api/api-errorhandler.service';
import { ApiService } from './api/api.service';
import { AuthService } from './api/auth.service';
import { CookieService } from 'angular2-cookie/core';
import { ModalFormService } from './components/forms/modal-forms.service';
import { AlertService } from './alerts/alerts.service';
// modules
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// components
import { AlertsComponent } from './alerts/alerts.component';
import { AppBrowserComponent } from './app-browser/app-browser/app-browser.component';
import { AppComponent } from './app.component';
import { AppointmentBrowser } from './components/appointments/appointment-browser/appointment-browser.component';
import { AppointmentForm } from './components/appointments/appointment-form/appointment-form.component';
import { AppointmentList } from './components/appointments/appointment-list/appointment-list.component';
import { HealthCentreBrowser } from './components/health-centres/health-centre-browser/health-centre-browser.component';
import { HealthCentreForm } from './components/health-centres/health-centre-form/health-centre-form.component';
import { HealthCentreList } from './components/health-centres/health-centre-list/health-centre-list.component';
import { HealthCentreProfile } from './components/health-centres/health-centre-profile/health-centre-profile.component';
import { HealthCentreRatingList } from './components/ratings/health-centre-rating-list/health-centre-rating-list.component';
import { LoginForm } from './components/login/login-form/login-form.component';
import { ModalConfirm } from './components/forms/modal-dialog.component';
import { ModalPatientForm, ModalProviderForm, ModalHealthCentreForm, ModalAppointmentForm, ModalHealthCentreRatingForm, ModalProviderRatingForm } from './components/forms/modal-forms.component';
import { PatientBrowser } from './components/patients/patient-browser/patient-browser.component';
import { PatientForm } from './components/patients/patient-form/patient-form.component';
import { PatientList } from './components/patients/patient-list/patient-list.component';
import { PatientProfile } from './components/patients/patient-profile/patient-profile.component';
import { ProviderBrowser } from './components/providers/provider-browser/provider-browser.component';
import { ProviderForm } from './components/providers/provider-form/provider-form.component';
import { ProviderList } from './components/providers/provider-list/provider-list.component';
import { ProviderProfile } from './components/providers/provider-profile/provider-profile.component';
import { ProviderRatingList } from './components/ratings/provider-rating-list/provider-rating-list.component';
import { RatingsBrowser } from './components/ratings/ratings-browser/ratings-browser.component';
import { RegisterFormPatient } from './components/login/register-form-patient/register-form-patient.component';
import { RegisterFormProvider } from './components/login/register-form-provider/register-form-provider.component';
import { ModalBody } from './components/forms/modal-body.component';
import { HealthCentreRatingForm } from './components/ratings/health-centre-rating-form/health-centre-rating-form.component';
import { ProviderRatingForm } from './components/ratings/provider-rating-form/provider-rating-form.component';
import { CommonModule } from '@angular/common';
import { AppBrowserToolbar } from './app-browser/app-browser-toolbar/app-browser-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    // browser
    AppBrowserComponent,
    AppBrowserToolbar,
    // health centre
    HealthCentreBrowser,
    HealthCentreForm,
    HealthCentreList,
    HealthCentreProfile,
    // patient
    PatientBrowser,
    PatientForm,
    PatientList,
    PatientProfile,
    // provider
    ProviderBrowser,
    ProviderForm,
    ProviderList,
    ProviderProfile,
    // appointment
    AppointmentBrowser,
    AppointmentForm,
    AppointmentList,
    // ratings
    HealthCentreRatingForm,
    HealthCentreRatingList,
    ProviderRatingForm,
    ProviderRatingList,
    RatingsBrowser,
    // login
    LoginForm,
    RegisterFormPatient,
    RegisterFormProvider,
    // modals
    ModalAppointmentForm,
    ModalBody,
    ModalConfirm,
    ModalHealthCentreForm,
    ModalHealthCentreRatingForm,
    ModalPatientForm,
    ModalProviderForm,
    ModalProviderRatingForm,
    // alerts
    AlertsComponent,
  ],
  entryComponents: [
    // modals
    ModalAppointmentForm,
    ModalConfirm,
    ModalHealthCentreForm,
    ModalHealthCentreRatingForm,
    ModalPatientForm,
    ModalProviderForm,
    ModalProviderRatingForm,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RoutingModule,
  ],
  providers: [
    AlertService,
    ApiService,
    AuthService,
    CookieService,
    ModalFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
