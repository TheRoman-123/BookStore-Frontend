import {BookWithSaleAmount} from "./BookWithSaleAmount";

export interface Sale {
  carts: Array<BookWithSaleAmount>;
  cost: number;
}
