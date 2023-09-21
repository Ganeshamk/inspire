import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.get(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getBook should use GET to retrieve data', () => {
    let expectedData = {
      "data": {
        "author": "Roald Dahl",
        "birthday": "September 13, 1916",
        "birthPlace": "Cardiff, United Kingdom",
        "books": [
          {
            "imageUrl": "https://m.media-amazon.com/images/I/91I2ywLs1YL.jpg",
            "title": "The BFG",
            "purchaseLink": "https://www.amazon.com/BFG-Roald-Dahl/dp/0142410381/",
            "PublishDate": "1982"
          },
          {
            "imageUrl": "https://m.media-amazon.com/images/I/91C5S-RQeeL.jpg",
            "title": "The Witches",
            "purchaseLink": "https://www.amazon.com/Witches-Roald-Dahl/dp/014241011X/",
            "PublishDate": "1983"
          }
        ]
      },
      "status": "success"
    }

    service.getAuthorInformation().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const testRequest = httpTestingController.expectOne('https://s3.amazonaws.com/api-fun/books.json');
    expect(testRequest.request.method).toEqual('GET');
  });
});
