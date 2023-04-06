import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';

import { invokeSaveNewBookAPI } from '../store/action/books.action';


describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let mockStore: MockStore;
  const initialState = {
    appState: { apiStatus: { apiStatus: '', apiResponseMessage: '' } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    expect(component.bookForm).toEqual({ id: 0, author: '', name: '', cost: 0 });
  });



  it('should dispatch invokeSaveNewBookAPI action and navigate to home page on successful API response', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    spyOn(component.appStore, 'pipe').and.callThrough();
    const mockApiStatus = { apiStatus: 'success', apiResponseMessage: '' };
    const mockSelectAppState = cold('a', { a: mockApiStatus });
    spyOn(component.appStore, 'select').and.returnValue(mockSelectAppState);
    component.save();
    expect(mockStore.dispatch).toHaveBeenCalledWith(invokeSaveNewBookAPI({ newBook: component.bookForm }));
  });

});
