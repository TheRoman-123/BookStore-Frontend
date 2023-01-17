import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookWithSaleAmount} from "../types/BookWithSaleAmount";
import {Observable, ObservableInput, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  serverUrl: string = "http://localhost:8080/sales";

  constructor(private http: HttpClient) { }

  createSale(cost: number, user_id: number, books: Array<BookWithSaleAmount>) {
    const url = this.serverUrl + `?cost=${cost}&user_id=${user_id}`;
    let request = books.map(a => {
      a.book.id;
      a.amount;
    });

    return this.http.post(url, request)
      .pipe(
        tap((id: Object) => {
          id = id as number;
          console.log(`Order id=${id}`);
        }),
        catchError(
          (err, caught): ObservableInput<any> => {
            alert('Попробуйте связаться с сервером позже.' + err);
            console.error(err.getMessage());
            return caught;
          }
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // better: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.id}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
