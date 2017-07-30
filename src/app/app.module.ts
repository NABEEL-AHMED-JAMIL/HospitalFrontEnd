// -------------Module---------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ngx-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
// -------------Routing--------------------------------------
import { routing } from './app.routing';
// ------------import from the outsorce--------------------
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
// ------------Component------------------------------------
import { AlertComponent } from './_directives/index';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {RegisterComponent , EqualValidator} from './register/index';
import {AddNote} from './addNote/index';
import { CDialogComponent } from './_dialog_box/index';
import { AddPatient } from './addPatient/index';
// ----------------Service-----------------------------
import { AuthGuard } from './_guards/index';
import { SharedService, AlertService, AuthenticationService, DoctorService,
  NoteService, PatientService, DoctorTypeService, UtilService, ConfigService, RoleService
} from './_services/index';


// export function initUserFactory(authenticationService: AuthenticationService) {
//     return () => authenticationService.initRefreshCall();
// }

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddNote,
    AddPatient,
    CDialogComponent,
    // Directive same like component....
    NgTableComponent,
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective,
    EqualValidator
  ],
  imports: [
    AngularMultiSelectModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule,
    routing,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    AuthGuard, SharedService, AlertService,
    AuthenticationService, DoctorService, NoteService,
    PatientService, DoctorTypeService, UtilService,
    ConfigService, RoleService,
    // {
    //   'provide': APP_INITIALIZER,
    //   'useFactory': initUserFactory,
    //   'deps': [AuthenticationService],
    //   'multi': true
    // }
  ],
  entryComponents: [
    CDialogComponent

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
