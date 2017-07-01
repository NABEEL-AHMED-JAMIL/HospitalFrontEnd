//-------------Module---------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ngx-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
//-------------Routing--------------------------------------
import { routing }        from './app.routing';
//------------import from the outsorce--------------------
import { 
  NgTableComponent,
  NgTableFilteringDirective,
  NgTablePagingDirective,
  NgTableSortingDirective 
} from 'ng2-table/ng2-table';
//------------Component------------------------------------
import { AlertComponent } from './_directives/index';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {RegisterComponent} from './register/index';
import {AddNote} from './addNote/index';
import { CDialogComponent } from './_dialog_box/index';
//----------------Service------------------------------
import { AuthGuard } from './_guards/index';
import {
  SharedService, 
  AlertService, 
  AuthenticationService,
  DocterService,
  NoteService,
  PatientService,
  DocterTypeService
} from './_services/index';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddNote,
    CDialogComponent,
    // Directive same like component....
    NgTableComponent, 
    NgTableFilteringDirective,
    NgTablePagingDirective, 
    NgTableSortingDirective
    
  ],
  imports: [
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
    AuthGuard,
    SharedService,
    AlertService,
    AuthenticationService,
    DocterService,
    NoteService,
    PatientService,
    DocterTypeService,

  ],
  entryComponents: [
    CDialogComponent
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
