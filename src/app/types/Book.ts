import {Author} from "./Author";

export interface Book {
  id: number;
  title: string;
  authors: Array<Author>;
  price: number;
  image?: string;
  amount?: number;
}
