import { IBook } from "./IBook";

export interface IUser {
  checkedOutBooks: IBook[];
  canCheckOutMoreBooks(): boolean;
  checkOutBook(book: IBook): string;
  returnBook(book: IBook): string;
}

export abstract class BookBase implements IBook {
  constructor(public title: string, public author: string, public isAvailable: boolean = true) {}
}

export class Book extends BookBase {}

export abstract class UserBase implements IUser {
  checkedOutBooks: IBook[] = [];

  abstract canCheckOutMoreBooks(): boolean;

  checkOutBook(book: IBook): string {
    if (this.checkedOutBooks.some((b) => b.title === book.title && b.author === book.author)) {
      return "You have already checked out this book.";
    }

    if (this.canCheckOutMoreBooks()) {
      this.checkedOutBooks.push(book);
      book.isAvailable = false;
      return `Book "${book.title}" by ${book.author} checked out successfully.`;
    } else {
      return "You have reached the maximum limit of checked-out books. Please return some books to check out more.";
    }
  }

  returnBook(book: IBook): string {
    const index = this.checkedOutBooks.findIndex((b) => b === book);
    if (index !== -1) {
      this.checkedOutBooks.splice(index, 1);
      book.isAvailable = true;
      return `Book "${book.title}" by ${book.author} returned successfully.`;
    } else {
      return "You did not check out this book from the library.";
    }
  }
}

export class User extends UserBase {
  canCheckOutMoreBooks(): boolean {
    return this.checkedOutBooks.length < 3;
  }
}
