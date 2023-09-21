import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from 'src/app/services/data.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthorInfoComponent } from './author-info.component';

describe('AuthorInfoComponent', () => {
  let component: AuthorInfoComponent;
  let fixture: ComponentFixture<AuthorInfoComponent>;
  let data: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorInfoComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [DataService]
    });
    fixture = TestBed.createComponent(AuthorInfoComponent);
    component = fixture.componentInstance;
    data = TestBed.inject(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
