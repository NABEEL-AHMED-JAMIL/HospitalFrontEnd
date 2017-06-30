import { Component } from '@angular/core';
//----------------Service------------------------------
import { DialogService } from "ng2-bootstrap-modal";
//-------------Routing---------------------------------
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------
import { DialogComponent } from "ng2-bootstrap-modal";


export interface ConfirmModel {
   title: String;
   message: String;
}


@Component({
    selector: 'cd-dialog',  
    templateUrl:'dialog.component.html',
    styleUrls: []
})


export class CDialogComponent extends DialogComponent<ConfirmModel, String> implements ConfirmModel {

  title = 'pakistan....';
  message: String;
  
  constructor(dialogService: DialogService) {
      super(dialogService);
  }

  public viewNotes(): any {
      this.result = "view";
      this.close();
  }

  public edit(): any{
      this.result = "edit";
      this.close();
  }

  public delete(): any{
      this.result = "delete";
      this.close();
  }

  public cancel(): any {
      this.result = "cancel";
      this.close();
  }

}
