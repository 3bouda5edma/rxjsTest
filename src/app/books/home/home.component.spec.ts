import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home.component';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/action/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { cold } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore;
  let initialState: Appstate=({apiStatus:'',apiResponseMessage:''});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports :[RouterTestingModule],
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




  it('should display list of books', () => {
    const books = [
      { id: 1, author: 'Author1', name: 'Book1', cost: 10 },
      { id: 2, author: 'Author2', name: 'Book2', cost: 20 },
      { id: 3, author: 'Author3', name: 'Book3', cost: 30 },
    ];
    component.books$ = cold('a', { a: books });
    fixture.detectChanges();
    expect(books.length).toBe(3);
    expect(books[0].author).toContain('Author1');
    expect(books[1].name).toContain('Book2');
    expect(books[2].cost).toBe(30);
  });
});
