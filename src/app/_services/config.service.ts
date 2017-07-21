import { Injectable } from '@angular/core';
// import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ConfigService {

    // port url
    private _api_url: string = 'http://localhost:8080';
    // login url
    private _auth_url: string = '/auth';
    private _login_url: string = this._api_url+this._auth_url + '/login';
    // logout url
    private _logout_url: string = this._auth_url + '/logout';
    // register url
    private _register_url: string = this._api_url + '/register';
    // forgotPassword
    private _forgotPassword: string = this._api_url+this._auth_url+'/forgotPassword';

    // doctor url's
    private _doctor_url: string = '/doctor';
    private _getAllDoctor_url: string = this._api_url+this._doctor_url+'/getAllDoctor';
    private _getDoctor_url: string = this._api_url+this._doctor_url+'/getDoctor';
    // doctor-type url's
    private _docType_url: string = '/docType';
    private _addDoctorType_url: string = this._api_url+this._docType_url+'/addDoctorType';
    private _getAllDotorTypes_url: string = this._api_url+this._docType_url+'/getAllDotorTypes';
    private _deleteDoctorType_url: string = this._api_url+this._docType_url+'/deleteDoctorType';
    private _getDoctorType_url: string = this._api_url+this._docType_url+'/getDoctorType/';
    private _updateDoctorType_url: string = this._api_url+this._docType_url+'/updateDoctorType';
    // note url's
    private _note_url: string = '/note';
    private _newNote_url: string = this._api_url+this._note_url+'/newNote/';
    private _getAllNotes_url: string = this._api_url+this._note_url+'/getAllNotes/';
    private _deleteNote_url: string = this._api_url+this._note_url+'/deleteNote/';
    private _updateNote_url: string = this._api_url+this._note_url+'/updateNote/';
    // patient url's
    private _patient_url: string = '/patient';
    private _newPatient_url: string = this._api_url+this._patient_url+'/newPatient';
    private _getAllPatient_url: string = this._api_url+this._patient_url+'/getAllPatient';
    private _getAllPatientNote_url: string = this._api_url+this._patient_url+'/getAllPatientNote/';
    private _getPatient_url: string = this._api_url+this._patient_url+'/getPatient/';
    private _deletePatient_url: string = this._api_url+this._patient_url+'/deletePatient/';
    private _updatePatient_url: string = this._api_url+this._patient_url+'/updatePatient/';

    constructor() { }
    
    
    public get getapi_url(): string { return this._api_url; }

    public get getlogin_url(): string { return this._login_url; }
    
    public get getlogout_url(): string { return this._logout_url; }

    public get getregister_url(): string { return this._register_url; }

    public get getforgotPassword_url(): string { return this._forgotPassword; }

    // doctor
    public get getdoctors_url(): string { return this._getAllDoctor_url; }

    public get getDoctor_url(): string { return this._getDoctor_url; }

    // doctor type
    public get getaddDoctorType_url(): string { return this._addDoctorType_url; }

    public get getAllDotorTypes_url(): string { return this._getAllDotorTypes_url; }
    
    public get getdeleteDoctorType_url(): string { return this._deleteDoctorType_url; }
    
    public get getDoctorType_url(): string { return this._getDoctorType_url; }
    
    public get getupdateDoctorType_url(): string { return this._updateDoctorType_url; }
    
    // note url's
    public get getnote_url(): string { return this._note_url; }

    public get getnewNote_url(): string { return this._newNote_url; }
    
    public get getAllNotes_url(): string { return this._getAllNotes_url; }
    
    public get getdeleteNote_url(): string { return this._deleteNote_url; }
    
    public get getupdateNote_url(): string { return this._updateNote_url; }

    // patient url's
    public get getpatient_url(): string { return this._patient_url; }

    public get getnewPatient_url(): string { return this._newPatient_url; }
    
    public get getAllPatient_url(): string { return this._getAllPatient_url; }
    
    public get getAllPatientNote_url(): string { return this._getAllPatientNote_url; }
    
    public get getPatient_url(): string { return this._getPatient_url; }

    public get getdeletePatient_url(): string { return this._deletePatient_url; }
    
    public get getupdatePatient_url(): string { return this._updatePatient_url; }
 
    // // private helper methods
    // jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //     console.log("current User "+ currentUser);
    //     console.log("current User Token " + currentUser.Token);
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
    


}