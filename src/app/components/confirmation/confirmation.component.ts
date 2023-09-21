import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationConstants } from 'src/app/constants/constant';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constants: any = ConfirmationConstants;
  constructor(public dialogRef:MatDialogRef<ConfirmationComponent>, 
    @Inject(MAT_DIALOG_DATA) public book: any) {}
  
  // close dailog
  cancel(): void {
    this.dialogRef.close();
  }

  // delete book
  delete() {
    this.dialogRef.close(this.book);
  }
}
