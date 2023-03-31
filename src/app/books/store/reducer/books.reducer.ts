
import { createReducer, on } from '@ngrx/store';
import { Books } from '../model/books';
import { booksFetchAPISuccess, saveNewBookAPISucess,updateBookAPISucess ,deleteBookAPISuccess} from '../action/books.action';

export const initialState: ReadonlyArray<Books> = [];
export class BooksReducer {
}
export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, { allBooks }) => {return allBooks;}),
  on(saveNewBookAPISucess, (state, { newBook }) => {let newState = [...state]; newState.unshift(newBook); return newState;}),
  on(updateBookAPISucess, (state, { updateBook }) => {let newState = state.filter((_) => _.id != updateBook.id); newState.unshift(updateBook); return newState;}),
  on(deleteBookAPISuccess, (state, { id }) => {let newState =state.filter((_) => _.id != id); return newState;})
);
