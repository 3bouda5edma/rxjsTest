import { invokeBooksAPI, booksFetchAPISuccess, invokeSaveNewBookAPI,saveNewBookAPISucess,  invokeUpdateBookAPI, updateBookAPISucess, invokeDeleteBookAPI, deleteBookAPISuccess } from './books.action';
import { Books } from '../model/books';

describe('BooksAction', () => {
  describe('invokeBooksAPI', () => {
    it('should create an action to invoke the books fetch API', () => {
      const action = invokeBooksAPI();
      expect(action.type).toEqual('[Books API] Invoke Books Fetch API');
    });
  });

  describe('booksFetchAPISuccess', () => {
    it('should create an action to handle books fetch API success', () => {
      const allBooks: Books[] = [
        { id: 1, name: 'Book 1', author: 'Author 1',cost:500 },
        { id: 2, name: 'Book 2', author: 'Author 2',cost:500 },
      ];
      const action = booksFetchAPISuccess({ allBooks });
      expect(action.type).toEqual('[Books API] Fetch API Success');
      expect(action.allBooks).toEqual(allBooks);
    });
  });

  describe('invokeSaveNewBookAPI', () => {
    it('should create an action to invoke the save new book API', () => {
      const newBook: Books = { id: 3, name: 'Book 3', author: 'Author 3' ,cost:500};
      const action = invokeSaveNewBookAPI({ newBook });
      expect(action.type).toEqual('[Books API] Inovke save new book api');
      expect(action.newBook).toEqual(newBook);
    });
  });

  describe('saveNewBookAPISuccess', () => {
    it('should create an action to handle save new book API success', () => {
      const newBook: Books = { id: 3, name: 'Book 3', author: 'Author 3',cost:500 };
      const action = saveNewBookAPISucess({ newBook });
      expect(action.type).toEqual('[Books API] save new book api success');
      expect(action.newBook).toEqual(newBook);
    });
  });

  describe('invokeUpdateBookAPI', () => {
    it('should create an action to invoke the update book API', () => {
      const updateBook: Books = { id: 1, name: 'Updated Book 1', author: 'Updated Author 1' ,cost:500};
      const action = invokeUpdateBookAPI({ updateBook });
      expect(action.type).toEqual('[Books API] Inovke update book api');
      expect(action.updateBook).toEqual(updateBook);
    });
  });

  describe('updateBookAPISuccess', () => {
    it('should create an action to handle update book API success', () => {
      const updateBook: Books = { id: 1, name: 'Updated Book 1', author: 'Updated Author 1',cost:500 };
      const action = updateBookAPISucess({ updateBook });
      expect(action.type).toEqual('[Books API] update  book api success');
      expect(action.updateBook).toEqual(updateBook);
    });
  });

    describe('invokeDeleteBookAPI', () => {
      it('should create an action with the correct type and payload', () => {
        const id = 1;
        const action = invokeDeleteBookAPI({ id });
        expect(action.type).toEqual('[Books API] Inovke delete book api');
        expect(action.id).toEqual(id);
      });
    });

    describe('deleteBookAPISuccess', () => {
      it('should create an action with the correct type and payload', () => {
        const id = 1;
        const action = deleteBookAPISuccess({ id });
        expect(action.type).toEqual('[Books API] deleted book api success');
        expect(action.id).toEqual(id);
      });
    });
  });

