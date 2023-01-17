import { Injectable } from '@angular/core';
import { Book } from '../types/Book';
import {HttpClient} from "@angular/common/http";
import {BookWithSaleAmount} from "../types/BookWithSaleAmount";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Array<BookWithSaleAmount> = [];

  constructor(private http: HttpClient) {}

  add(book: Book, bookCounter: number) {
    let bookToAdd: BookWithSaleAmount = {
      book: book,
      amount: bookCounter
    };

    for (let bookWithSaleAmount of this.cart) {
      if (bookWithSaleAmount.book.id == book.id) {
        bookWithSaleAmount.amount += bookCounter;
        return;
      }
    }
    this.cart.push(bookToAdd);
  }

  remove(bookId: number) {
    this.cart = this.cart.filter(value => value.book.id != bookId);
  }

  getBooks() {
    return this.cart;
  }

  getBooksFromServer() {

  }

}
