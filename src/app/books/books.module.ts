import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books.component';
import {BooksService} from "./books.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [BooksComponent, BookComponent],
  providers: [BooksService],
  imports: [CommonModule, FormsModule],
    exports: [BooksComponent, BookComponent],
})
export class BooksModule {}
