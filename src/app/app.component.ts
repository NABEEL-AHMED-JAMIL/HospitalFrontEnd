//-------------Module---------------------------------------
import { Doctor } from './_models/index';
//-------------Routing--------------------------------------
//------------import from the outsorce--------------------
//------------Component------------------------------------
import { Component } from '@angular/core';
//----------------Service------------------------------
import {SharedService, AuthenticationService } from './_services/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent {

  private loginMessage: string =  "Login Plase!";
  private hide: boolean = false;  
  private currentDoctor: Doctor;
  private userName: any;
  private patient: any;
  
  constructor(private _sharedService: SharedService, private authenticationService: AuthenticationService) {
	  this._sharedService.changeEmitted$.subscribe(status => {
	      console.log("status "+ status);
		  if(status) {
			  this.hide = status;
			  this.currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
			  this.userName = this.currentDoctor.userName.toUpperCase();
		  }
	   });
    // gettign the patient name
    this._sharedService.patientEmitted$.subscribe(patient =>{
		this.patient = patient;
	});
  }
  
  public logout(event) {
      this.hide = false;
      // call the method to remove the data
      this._sharedService.emitChange(false);
      this.authenticationService.logout();
      this.userName = null;
      this.patient = null;
  }

}
