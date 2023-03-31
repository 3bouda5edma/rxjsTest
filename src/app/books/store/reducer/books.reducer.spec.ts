import * as fromBooks from './books.reducer';

describe('BooksReducer', () => {
  describe('undefined action', () => {
    it('return the default state', () => {
      const { initialState } = fromBooks;
      const action = {};
      const state = new fromBooks.BooksReducer();

    expect(new fromBooks.BooksReducer()).toBeTruthy();
  });
});
});

