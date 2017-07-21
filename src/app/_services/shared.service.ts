import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SharedService {

    private emitChangeSource = new Subject<any>();
    public changeEmitted$ = this.emitChangeSource.asObservable(); 
    public emitChange(change: any): any {
        this.emitChangeSource.next(change);
    }
    
 
}