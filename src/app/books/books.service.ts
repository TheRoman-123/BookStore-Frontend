import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpOptions} from "../types/Http";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Book} from "../types/Book";

@Injectable()
export class BooksService {
  serverUrl: string = "http://localhost:8080/books";
  httpOptions: HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get(this.serverUrl).pipe(
      map((data) => {
        let list: any[] = data as any[];

        return list.map((book) => {
          return {
            id: book.id,
            price: book.price,
            title: book.title,
            image: book.image,    // TODO: придумай что-то с картинкой
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
