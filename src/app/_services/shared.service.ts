import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class SharedService {

    private emitChangeSource = new Subject<any>();
    public changeEmitted$ = this.emitChangeSource.asObservable(); 
    public emitChange(change: any): any {
        this.emitChangeSource.next(change);
    }
    
    // used for open the gate
    private statusChangeSource = new Subject<boolean>();
    public statusChangeEmitted$ = this.statusChangeSource.asObservable(); 
    public statusEmitChange(change: boolean): any {
        this.statusChangeSource.next(change);
    }
    
    // look change for login status like  (show the logout and hide the logout)
    private loginStatusChangeSource = new Subject<any>();
    public loginChangeEmitted$ = this.loginStatusChangeSource.asObservable();
    public loginEmitChange(change: any): any {
        this.loginStatusChangeSource.next(change);
    }

    // this is show for adding the new doctor or not
    private registerStatusChangeSource = new Subject<any>();
    public registerChangeEmitted$ = this.registerStatusChangeSource.asObservable();
    public registerEmitChange(change: any): any {
        this.registerStatusChangeSource.next(change);
    }

    // this is show the name of the current patient name yes or not
    private patientStatusChangeSource = new Subject<any>();
    public patientChangeEmitted$ = this.patientStatusChangeSource.asObservable(); 
    public patientEmitChange(change: any): any {
        this.patientStatusChangeSource.next(change);
    }

    private docterChangeSource = new Subject<any>();
    public docterChangeEmitted$ = this.emitChangeSource.asObservable();
    public docterEmitChange(change: any): any {
        this.docterChangeSource.next(change);
    }





}