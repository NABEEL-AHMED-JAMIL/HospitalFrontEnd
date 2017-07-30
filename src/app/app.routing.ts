// -------------Module---------------------------------------
// -------------Routing--------------------------------------
import { Routes, RouterModule } from '@angular/router';
// ------------import from the outsorce--------------------
// ------------Component------------------------------------
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {RegisterComponent} from './register/index';
import { ForgotPasswordComponent } from './forgotpassword/index';
import {AddNoteComponent } from './addNote/index';
import { AddPatientComponent } from './addPatient/index';
// ----------------Service------------------------------
import { AuthGuard } from './_guards/index';


const appRoutes: Routes = [

    { path: 'app-login', component: LoginComponent },
    { path: 'app-register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'app-forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
    {path: 'app-add-note', component: AddNoteComponent , canActivate: [AuthGuard]},
    { path: 'app-add-note/:mrNo', component: AddNoteComponent , canActivate: [AuthGuard]},
    { path: 'app-home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'app-add-patient', component: AddPatientComponent , canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/app-home' }
];

export const routing = RouterModule.forRoot(appRoutes);
