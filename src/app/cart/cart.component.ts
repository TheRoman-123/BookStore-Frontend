import {Component, OnChanges, OnInit} from '@angular/core';
import { CartService } from './cart.service';
import {BookWithSaleAmount} from "../types/BookWithSaleAmount";
import {SaleService} from "../services/sale.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnChanges {
  booksWithSaleAmount: Array<BookWithSaleAmount> = [];
  cost: number = 0;

  constructor(private cartService: CartService,
              private saleService: SaleService) {}

  ngOnInit(): void {
    this.booksWithSaleAmount = this.cartService.getBooks();
  }

  ngOnChanges(): void {
    this.cost = this.booksWithSaleAmount.map(a => a.book.price)
        .reduce((sum, price) => sum + price, 0);
  }




  createSale() {

    this.saleService.createSale(this.cost, 1, this.booksWithSaleAmount).subscribe(
      (data) => {
        alert("Your order successfully saved! Order ID:" + (data as number));
      }
    );
  }
}
