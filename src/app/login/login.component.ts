import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// ----------------Service------------------------------
import { SharedService, AlertService, AuthenticationService, UtilService  } from '../_services/index';
// -------------Routing---------------------------------
import { Router, ActivatedRoute } from '@angular/router';
// ------------Component--------------------------------
import { AppComponent } from '../app.component';


@Component({

    selector: 'app-login',
    templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {

    public hide: Boolean = true;
    // form used
    public loginDto: any = {};
    // form used
    public forgotPassword: any = {};
    public loadinglogin = false;
    public loadingForgot = false;
    public image: String;
    public returnUrl: string;

    constructor(
        private route: ActivatedRoute, private router: Router,private _sharedService: SharedService,
        private authenticationService: AuthenticationService, private alertService: AlertService,
        private utilService: UtilService
       ) { }


    ngOnInit() {
        this.image = this.utilService.getCircalImage();
    }

    public login(): any{
         this.loadinglogin = true;
         this.authenticationService.login(this.loginDto)
            .subscribe(
                data => {
                    this.loadinglogin = false;
                    this.router.navigate(['/app-home']);
                     this.alertService.success('USER LOGIN');
                }, error => {
                    this.alertService.error('Wrong Password And User Name');
                    this.loadinglogin = false;
                }
            );
     }

     public send(): any {
         this.loadingForgot = true;
         console.log(this.forgotPassword);
         this.authenticationService.forGotPassWord(this.forgotPassword.email)
            .subscribe(
                data => {
                    console.log('data ' + data);
                    this.alertService.success('Check Your Email');
                    this.loadingForgot = false;
                },
                error => {
                    console.log('error ' + error);
                    this.alertService.error('Invalide Email!');
                    this.loadingForgot = false;
                }
            );
     }

     public hideShow(): any {
         if (this.hide) {
             this.hide = false;
         }else {
             this.hide = true;
         }
     }
}
