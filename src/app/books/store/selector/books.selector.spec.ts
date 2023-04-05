import { selectBookById, selectBooks } from './books.selector';
import { Books } from '../model/books';

describe('Books Selector', () => {
  const books: Books[] = [
    { id: 1, name: 'Book 1', author: 'Author 1', cost: 10 },
    { id: 2, name: 'Book 2', author: 'Author 2', cost: 20 },
    { id: 3, name: 'Book 3', author: 'Author 3', cost: 30 }
  ];

  it('should select all books', () => {
    const result = selectBooks.projector(books);
    expect(result).toEqual(books);
  });

  /*
  
  it('should select a book by id', () => {
    const bookId = 2;
    const expectedBook = { id: 2, name: 'Book 2', author: 'Author 2', cost: 20 };
    const result = selectBookById(bookId).projector(books);
    expect(result).toEqual(expectedBook);
  });

  */

  it('should return null when selecting a book with an invalid id', () => {
    const bookId = 4;
    const result = selectBookById(bookId).projector(books);
    expect(result).toBeNull();
  });
});
