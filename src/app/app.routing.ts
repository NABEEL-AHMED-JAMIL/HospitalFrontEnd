//-------------Module---------------------------------------
//-------------Routing--------------------------------------
import { Routes, RouterModule } from '@angular/router';
//------------import from the outsorce--------------------
//------------Component------------------------------------
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {RegisterComponent} from './register/index';
import {AddNote} from './addNote/index';
import { AddPatient } from './addPatient/index';
//----------------Service------------------------------
import { AuthGuard } from './_guards/index';


const appRoutes: Routes = [

    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    {path: 'addnote', component:AddNote , canActivate: [AuthGuard]},
    { path: 'addnote/:mrNo', component: AddNote },
    // canActivate: [AuthGuard]
    {path: 'home', component:HomeComponent,canActivate: [AuthGuard]},
    {path: 'add-Patient', component: AddPatient , canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);