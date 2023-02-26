import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpOptions} from "../types/Http";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Book} from "../types/Book";
import {Constants} from "../constants/Constants";

@Injectable()
export class BooksService {
  serverUrl: string = Constants.serverUrl + "books";
  httpOptions: HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  pageNumber: number = 0;
  pageSize: number = 50;
  sortCriteria: string = "title";
  desc: boolean = false;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    let url = this.serverUrl +
      "?pageNumber=" + this.pageNumber +
      "&pageSize=" + this.pageSize +
      "&sortCriteria=" + this.sortCriteria +
      "&desc=" + this.desc;

    return this.http.get(url).pipe(
      map((data) => {
        let list: any[] = data as any[];

        return list.map((book) => {
          return {
            id: book.id,
            price: book.price,
            title: book.title,
            authors: book.authors
          }
        });
      }),
      catchError((err): Observable<Book[]> => {
        alert('Попробуйте связаться с сервером позже.' + err);
        return of([]);        // Потом: Взять старую информацию
      })
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
