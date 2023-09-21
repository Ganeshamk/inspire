import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBookConstants } from 'src/app/constants/constant';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  constants: any = CreateBookConstants;
  bookForm! : FormGroup;
  nameFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialogRef:MatDialogRef<CreateBookComponent>, 
    @Inject(MAT_DIALOG_DATA) public book: any, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      purchaseLink: ['', Validators.required],
      PublishDate: ['', Validators.required],
    });

    if(this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  // Close create book dailog
  closeDailog(): void {
    this.dialogRef.close();
  }

  // Save Book information
  saveBookInformation() {
    this.dialogRef.close(this.bookForm.value);
  }
}
