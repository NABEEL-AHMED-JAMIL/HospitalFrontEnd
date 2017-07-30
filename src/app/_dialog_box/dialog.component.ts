import { Component } from '@angular/core';
// ----------------Service------------------------------
import { DialogService } from 'ng2-bootstrap-modal';
// ------------Component--------------------------------
import { DialogComponent } from 'ng2-bootstrap-modal';


export interface ConfirmModel {
    title: String;
    message: String;
}


@Component({

    selector: 'app-cd-dialog',
    templateUrl: './dialog.component.html'

})

export class CDialogComponent extends DialogComponent<ConfirmModel, String> {


    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    public viewNotes(): any {
        this.result = 'view';
        this.close();
    }

    public edit(): any{
        this.result = 'edit';
        this.close();
    }

    public delete(): any{
        this.result = 'delete';
        this.close();
    }

    public cancel(): any {
        this.result = 'cancel';
        this.close();
    }

    // this is only show when patient add
    public addNewNotes(){
         this.result = 'newNote';
        this.close();
    }

}
