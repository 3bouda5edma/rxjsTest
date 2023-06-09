## TDD
https://www.youtube.com/watch?v=E87XhgYBM-Y
## link
https://www.learmoreseekmore.com/2022/06/angular-14-statemanagement-crud-example-with-rxjs14.html

https://medium.com/@gajera_jatin/state-management-with-ngrx-angular-734e39f2d5a2
# Commands
NgRx Schematics provides scaffolding. NgRx commands get integrated into the Angular CLI, and most of the NgRx elements can be created using angular CLI. So, let's add NgRx Schematics.
```
ng add @ngrx/schematics@latest
```
## Configure the Schematics so that NgRx commands are available in Angular CLI by default.
```
ng config cli.defaultCollection @ngrx/schematics
```
## Let’s install the NgRx,  dependencies, and dev-tools now.
```
npm install @ngrx/store --save 
```
```
npm install @ngrx/effects --save 
```
```
npm install @ngrx/entity --save 
```
```
npm install @ngrx/store-devtools --save
```
## Add an NgRx Store to the App
```
ng generate @ngrx/schematics:store State --root --module app.module.ts
```
## Create a sub Module for Customer
```
ng generate module Customer
```
## Create a Customer model
```
ng generate class models/customer
```
## Add Actions
```
ng generate action customer/store/action/Customer
```
## Add a Customer Reducer
```
ng generate reducer customer/store/reducer/Customer
```
## Add Selector
```
ng generate selector customer/store/selector/Customer
```
## Add a UI Component for View Customers
```
ng generate component customer/CustomerView
```
