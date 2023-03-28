import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { bookReducer } from './store/books.reducer';
import { BooksEffect } from './store/books.effect';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    EffectsModule.forFeature([BooksEffect]),
    StoreModule.forFeature('mybooks', bookReducer),
  ]
})
export class BooksModule { }
