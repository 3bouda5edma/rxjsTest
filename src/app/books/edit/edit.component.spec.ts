import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { EditComponent } from './edit.component';
import { invokeUpdateBookAPI } from '../store/action/books.action';
import { FormsModule } from '@angular/forms';
import { Books } from '../store/model/books';
import { of } from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  let store: MockStore;
  const initialState = {
    books: {
      bookList: [
        { id: 1, author: 'Author1', name: 'Book1', cost: 10 },
        { id: 2, author: 'Author2', name: 'Book2', cost: 20 },
        { id: 3, author: 'Author3', name: 'Book3', cost: 30 },
      ],
    },
    app: {
      apiResponseMessage: '',
      apiStatus: '',
    },
  };
  const mockActivatedRoute = {
    paramMap: of({ get: () => '1' })
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [ FormsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: routerSpy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should dispatch the updateBook API and redirect to home when API status is success', () => {
    const book: Books = { id: 14, author: 'Author1', name: 'Book1', cost: 10 };
    const spy = spyOn(store, 'dispatch');
    component.bookForm = book;
    spyOn(store, 'pipe').and.returnValue(of({apiStatus: 'success'}));
    component.udapte();
    expect(spy).toHaveBeenCalledWith(invokeUpdateBookAPI({ updateBook: { ...book } }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
});



});
