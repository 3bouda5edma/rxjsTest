import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home.component';
import { selectBooks } from '../store/selector/books.selector';
import { invokeDeleteBookAPI, invokeBooksAPI } from '../store/action/books.action';
import { setAPIStatus } from 'src/app/shared/store/action/app.action';
import { selectAppState } from 'src/app/shared/store/selector/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { cold } from 'jasmine-marbles';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore;
  let initialState: Appstate=({apiStatus:'',apiResponseMessage:''});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports :[RouterTestingModule,ActivatedRoute, Router],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch invokeBooksAPI action on init', () => {
    spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(invokeBooksAPI());
  });

  /*
  it('should dispatch invokeDeleteBookAPI and setAPIStatus actions on delete', () => {
    spyOn(mockStore, 'dispatch');
    spyOn(component.appStore, 'pipe').and.callThrough();
    const mockApiStatus = { apiStatus: 'success', apiResponseMessage: '' };
    const mockSelectAppState = cold('a', { a: mockApiStatus });
    spyOn(component.appStore, 'select').and.returnValue(mockSelectAppState);
    component.delete(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(invokeDeleteBookAPI({id: 1}));
    expect(component.appStore.select).toHaveBeenCalledWith(selectAppState);
    expect(mockStore.dispatch).toHaveBeenCalledWith(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));
  });

  */
  it('should display list of books', () => {
    const books = [
      { id: 1, author: 'Author1', name: 'Book1', cost: 10 },
      { id: 2, author: 'Author2', name: 'Book2', cost: 20 },
      { id: 3, author: 'Author3', name: 'Book3', cost: 30 },
    ];
    component.books$ = cold('a', { a: books });
    fixture.detectChanges();
    const bookElements = fixture.nativeElement.querySelectorAll('.book');
    expect(bookElements.length).toBe(3);
    expect(bookElements[0].textContent).toContain('Author1');
    expect(bookElements[1].textContent).toContain('Book2');
    expect(bookElements[2].textContent).toContain('30');
  });
});
