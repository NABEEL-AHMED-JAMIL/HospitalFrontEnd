import { Component , OnInit } from '@angular/core';
import { DoctorDTO } from '../dto/index';
import { AlertService, UtilService, AuthenticationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';


@Component({

    selector: 'app-forgot-password',
    templateUrl: 'forgotpassword.component.html',
    styleUrls: ['forgotpassword.component.css']
})

export class ForgotPasswordComponent implements OnInit {

    private loading: Boolean = false;
    private image: String;
    public updateDocterPass: DoctorDTO;
    public id: Number;

    constructor(private alertService: AlertService, private authenticationService: AuthenticationService,
        private utilService: UtilService, public route: ActivatedRoute, private router: Router ) {}

    ngOnInit() {
         this.updateDocterPass = { email: null, username: null, password: '', confirmPassword: '',
                    firstname: null, lastname: null, gender: null, active: null, roles: [], doctorType: null };
         this.route.params.subscribe(params => { this.id = params['id']; });
         this.image = this.utilService.getCircalImage();
         this.authenticationService.fetchRestPassWordDetail(this.id).subscribe(
             data => {

                this.updateDocterPass.email = data.email;
                this.updateDocterPass.username = data.username;

            }, error => {
                this.alertService.error('Fetching Detail Problem Accure');
            });
    }

    public updatePassword(updateDocterPass: DoctorDTO, isValid: boolean) {
        console.log('Event press ' + isValid);
        if (isValid) {
            this.loading = true;
            this.authenticationService.updatePassword(this.id, updateDocterPass.password).subscribe(
                data => {
                    console.log(data);
                    this.alertService.success('PassWord Reset Click Cancel');
                    this.loading = false;
                }, error => {
                    this.alertService.error('PassWord Not Set Reset again.');
                    this.loading = false;
                });
        }else {
            this.alertService.error('PassWord Not Match');
            this.loading = false;
        }
    }
}
