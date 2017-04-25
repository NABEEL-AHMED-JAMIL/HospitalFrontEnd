//-------------module---------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
//-------------routing--------------------------------------
import { routing }        from './app.routing';
//------------import from the outsorce--------------------
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
//------------Component------------------------------------
import { AlertComponent } from './_directives/index';
import { AppComponent } from './app.component';
import { HomeComponent , HomeDialogComponent } from './home/index';
import { LoginComponent } from './login/index';
import {RegisterComponent} from './register/index';
import {AddNote , NoteDialogComponent} from './addNote/index';
//----------------Service------------------------------
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService,DocterService , NoteService , PatientService , DocterTypeService} from './_services/index';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    HomeDialogComponent,
    LoginComponent,
    RegisterComponent,
    NoteDialogComponent,
    AddNote,
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
     FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
     
     
     
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    DocterService,
    NoteService,
    PatientService,
    DocterTypeService,

  ],
  entryComponents: [
   
    HomeDialogComponent,NoteDialogComponent
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
