import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';

import { invokeBooksAPI,invokeDeleteBookAPI  } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

declare var window: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}
  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI());
    console.log(this.deleteModal);
  }


  delete(bookId: number) {
    this.store.dispatch(invokeDeleteBookAPI({id: bookId,}));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        console.log("oui")
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
