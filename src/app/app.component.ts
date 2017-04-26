import { Component } from '@angular/core';
import {SharedService } from './_services/index';
import { Docter } from './_models/index';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  //

  private currentDocter: Docter;
  private userName: any;
  private patient: any;
  
  
  constructor(private _sharedService: SharedService) {
      
         this._sharedService.changeEmitted$.
         subscribe(text => {
              console.log(text);
              if(text == "Data from child"){
                this.patient = null;
                 this.currentDocter = JSON.parse(localStorage.getItem('currentUser'));
                 this.userName = this.currentDocter.userName;
            }else if(text == "End call"){
                  this.userName = "";
                  this.patient = "";
              }else{
                  this.currentDocter = JSON.parse(localStorage.getItem('currentUser'));
                  this.userName = this.currentDocter.userName;
                  this.patient = text;
              }
             
            
        });
         

  }

      clicked(event) {
          console.log("Event press");
          this.userName = null;
          this.patient = null;
  }


}
