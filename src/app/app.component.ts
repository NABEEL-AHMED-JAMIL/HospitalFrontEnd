//-------------Module---------------------------------------
import { Doctor } from './_models/index';
//-------------Routing--------------------------------------
//------------import from the outsorce--------------------
//------------Component------------------------------------
import { Component } from '@angular/core';
//----------------Service------------------------------
import {SharedService } from './_services/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent {

  private loginMessage: string =  "Login Plase!";
  private status: boolean;  
  private currentDoctor: Doctor;
  private userName: any;
  private patient: any;
  
  constructor(private _sharedService: SharedService) {
    this._sharedService.changeEmitted$.
      subscribe(status => {
        console.log("status "+ status);
        if(status) {
          // getting the current doctor from the local storage
          this.currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
          this.userName = this.currentDoctor.userName;
          // 
        }
      });
  }
  
  public logout(event) {
      console.log("Event press");
      this.userName = null;
      this.patient = null;
  }

}
