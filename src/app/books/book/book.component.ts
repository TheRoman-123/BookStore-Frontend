import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Book } from '../../types/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() book: Book = {} as Book;
  @Input() bookCounter: number = 1;
  @Input() isInCartComponent: boolean = false;

  @Output() removeEmitter = new EventEmitter<Book>();

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.add(this.book, this.bookCounter);
  }

  decreaseAmount() {
    if (this.bookCounter > 1) {
      this.bookCounter--;
    } else if (this.isInCartComponent &&
      confirm("Are yous sure you want to remove this item from your cart?")) {
      this.isInCartComponent = false;
      this.cartService.remove(this.book.id);
      this.removeEmitter.emit(this.book);
    }
  }

  increaseAmount() {
    this.bookCounter++;
  }
}
