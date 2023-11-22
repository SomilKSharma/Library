import { IBook } from "./IBook";

export interface IUser {
    checkedOutBooks: IBook[];
    canCheckOutMoreBooks(): boolean;
    checkOutBook(book: IBook): string;
    returnBook(book: IBook): string;
  }