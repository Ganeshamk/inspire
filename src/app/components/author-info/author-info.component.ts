import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { FormControl } from '@angular/forms';
import { CreateBookComponent } from '../create-book/create-book.component';
import { AuthInfoConstants } from 'src/app/constants/constant';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss']
})
export class AuthorInfoComponent implements OnInit {
  constants: any = AuthInfoConstants;
  authorInformation: any;
  isAsc: boolean = true;
  sortOrder: string = '';
  sortType: string = 'title';
  selectedSortTypeControl = new FormControl(this.sortType);
  currentBookIndex: any;

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAuthorsInformation();
  }

  // get Books information
  getAuthorsInformation() {
    this.dataService.getAuthorInformation().subscribe((info: any) => {
      if(info) {
        this.authorInformation = info?.data;
        this.sortBook(this.sortType);
      }
    }, err => {
      console.log(err);
    })
  }

  // Sort books based on selected sort type
  sortBook(sortType: any) {
    this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    this.authorInformation?.books?.sort((a: any,b: any) => {
      if(this.sortOrder == 'asc') {
        if(sortType == 'title') {
          if (a[sortType].toLowerCase() < b[sortType].toLowerCase()) {return -1;}
        } else {
          return a[sortType] - b[sortType];
        }
      } else {
        if(sortType == 'title') {
          if (a[sortType].toLowerCase() > b[sortType].toLowerCase()) {return -1;}
        } else {
          return b[sortType] - a[sortType];
        }
      }
      return 0;
    });
  }

  // Open confirmation dialog for delete book
  openConfirmationDialog(book: any) {
    const dialogRef = this.dialog.open(ConfirmationComponent,{
      width: '500px',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let index = this.authorInformation?.books?.findIndex((book: any) => result.title == book.title);
        if(index > -1) {
          this.authorInformation?.books?.splice(index, 1);
        }
      }
    });
  }

  // Open dialog for create book
  openCreateBookDialog() {
    const dialogRef = this.dialog.open(CreateBookComponent,{
      width: '500px',
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authorInformation.books.push(result);
      this.sortBook(this.sortType);
    });
  }

  // Open dialog for create book
  openEditBookDialog(book: any, index: number) {
    this.currentBookIndex = index;
    const dialogRef = this.dialog.open(CreateBookComponent,{
      width: '500px',
      data: book,
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.authorInformation.books[index] = result;
      }
    });
  }

  // Sort books based on selected sort type
  selectedSortType(event: any) {
    this.sortType = event?.target?.value;
    this.sortBook(this.sortType);
  }
}
