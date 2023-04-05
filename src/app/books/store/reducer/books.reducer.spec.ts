import { bookReducer, initialState } from './books.reducer';
import { booksFetchAPISuccess, saveNewBookAPISucess, updateBookAPISucess, deleteBookAPISuccess } from '../action/books.action';
import { Books } from '../model/books';

describe('bookReducer', () => {

  it('should return the initial state', () => {
    const action = {} as any;
    const state = bookReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should handle booksFetchAPISuccess', () => {
    const books = [{ id: 1, name: 'Book 1',author:'hmed',cost:200 }] as Books[];
    const action = booksFetchAPISuccess({ allBooks: books });
    const state = bookReducer(initialState, action);
    expect(state).toEqual(books);
  });

  it('should handle saveNewBookAPISucess', () => {
    const newBook = {id: 1, name: 'Book 1',author:'hmed',cost:200} as Books;
    const action = saveNewBookAPISucess({ newBook });
    const state = bookReducer(initialState, action);
    expect(state).toEqual([newBook]);
  });

  it('should handle updateBookAPISucess', () => {
    const books = [      { id: 1, name: 'Book 1',author:'hmed',cost:200 } as Books,      { id: 2, name: 'Book 2',author:'hmed',cost:200 } as Books,    ];
    const updateBook = { id: 1, name: 'Updated Book 1',author:'hmed',cost:200 } as Books;
    const action = updateBookAPISucess({ updateBook });
    const state = bookReducer(books, action);
    expect(state).toEqual([updateBook, books[1]]);
  });

  it('should handle deleteBookAPISuccess', () => {
    const books = [      { id: 1, name: 'Book 1' ,author:'hmed',cost:200} as Books,      { id: 2, name: 'Book 2' ,author:'hmed',cost:200} as Books,    ];
    const action = deleteBookAPISuccess({ id: 1 });
    const state = bookReducer(books, action);
    expect(state).toEqual([books[1]]);
  });

});
