import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Books } from './store/model/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
 url='http://localhost:3000/books'

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<Books[]>(this.url);
  }
  create(payload: Books) {
    return this.http.post<Books>(this.url, payload);
  }
  update(payload: Books) {
    return this.http.put<Books>(`${this.url}/${payload.id}`, payload);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
