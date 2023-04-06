import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, Subject, of, throwError } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/action/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../model/books';
import { booksFetchAPISuccess,deleteBookAPISuccess,invokeBooksAPI,invokeDeleteBookAPI,invokeSaveNewBookAPI,invokeUpdateBookAPI,saveNewBookAPISucess,updateBookAPISucess} from '../action/books.action';
import { BooksEffect } from './books.effect';
import { BooksService } from '../../books.service';
import { selectBooks } from '../selector/books.selector';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';



describe('BooksEffect', () => {
  let actions$: Observable<any>;
  let effects: BooksEffect;
  let booksServiceSpy: jasmine.SpyObj<BooksService>;
  let store: MockStore<Appstate>;
  let appStore: MockStore<Appstate>;
  let scheduler: TestScheduler;

  beforeEach(() => {
    const booksService = jasmine.createSpyObj('BooksService', [
      'get',
      'create',
      'update',
      'delete'
    ]);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        BooksEffect,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: BooksService, useValue: booksService }
      ]
    });

    effects = TestBed.inject(BooksEffect);
    booksServiceSpy = TestBed.inject(BooksService) as jasmine.SpyObj<BooksService>;
    store = TestBed.inject(Store) as MockStore<Appstate>;
    appStore = TestBed.inject(Store) as MockStore<Appstate>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch booksFetchAPISuccess action after invoking invokeBooksAPI with empty book list', () => {
    const books: Books[] = [];
    const action = invokeBooksAPI();
    const outcome = booksFetchAPISuccess({ allBooks: books });

    actions$ = of(action);
    store.overrideSelector(selectBooks, books);
    booksServiceSpy.get.and.returnValue(of(books));

    effects.loadAllBooks$.subscribe((result) => {
      expect(result).toEqual(outcome);
    });
  });

  it('should not dispatch any action after invoking invokeBooksAPI with non-empty book list', () => {
    const books: Books[] = [{ id: 1, name: 'Book 1', author: 'Author 1',cost:450 }];
    const action = invokeBooksAPI();

    actions$ = of(action);
    store.overrideSelector(selectBooks, books);

    effects.loadAllBooks$.subscribe((result) => {
      expect(result).toBeUndefined();
    });
  });
  /************************************************************************************************** */

  it('should dispatch saveNewBookAPISucess action after invoking invokeSaveNewBookAPI', () => {
    const newBook: Books = { id: 1 ,name: 'Book 1', author: 'Author 1',cost:450 };
    const action = invokeSaveNewBookAPI({ newBook });
    const outcome = saveNewBookAPISucess({ newBook });

    actions$ = of(action);
    booksServiceSpy.create.and.returnValue(of(newBook));
    store.overrideSelector('app', { apiStatus: { apiResponseMessage: '', apiStatus: '' } });

    effects.saveNewBook$.subscribe((result) => {
      expect(result).toEqual(outcome);
    });
  });



  it('should dispatch deleteBookAPISuccess action when API call is successful', () => {
    const id = 123;
    const action = invokeDeleteBookAPI({ id });
    const error = { message: 'Error deleting book' };
    const deleteBookAPISuccessAction = deleteBookAPISuccess({ id });
    spyOn(appStore, 'dispatch');

    effects.deleteBook$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } }));
      expect(store.dispatch).toHaveBeenCalledWith(deleteBookAPISuccessAction);
    });

    const actionsSubject = new Subject();
    actionsSubject.next(action);
    actions$ = actionsSubject.asObservable();
  });

});

