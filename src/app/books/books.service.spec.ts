import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BooksService } from './books.service';

describe('Post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let booksService: BooksService;
  let BOOKS = [
    {id: 1,name: 'yunis',author: 'fathi',cost:500},
    {id: 2,name: 'harry',author: 'ftouh',cost:700},
    {id: 3,name: 'soussa',author: 'jaballah',cost:300}];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        BooksService,
        {provide: HttpClient,
        useValue: httpClientSpyObj,
        },
      ],
    });
    booksService = TestBed.inject(BooksService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('get()', () => {
    it('should return expected posts when getposts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(BOOKS));
      booksService.get().subscribe({
        next: (books) => {
          expect(books).toEqual(BOOKS);
          done();
        },
        error: () => {done.fail;}});
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
