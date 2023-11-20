"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserBase = exports.Book = exports.BookBase = void 0;
class BookBase {
    constructor(title, author, isAvailable = true) {
        this.title = title;
        this.author = author;
        this.isAvailable = isAvailable;
    }
}
exports.BookBase = BookBase;
class Book extends BookBase {
}
exports.Book = Book;
class UserBase {
    constructor() {
        this.checkedOutBooks = [];
    }
    checkOutBook(book) {
        if (this.checkedOutBooks.some((b) => b.title === book.title && b.author === book.author)) {
            return "You have already checked out this book.";
        }
        if (this.canCheckOutMoreBooks()) {
            this.checkedOutBooks.push(book);
            book.isAvailable = false;
            return `Book "${book.title}" by ${book.author} checked out successfully.`;
        }
        else {
            return "You have reached the maximum limit of checked-out books. Please return some books to check out more.";
        }
    }
    returnBook(book) {
        const index = this.checkedOutBooks.findIndex((b) => b === book);
        if (index !== -1) {
            this.checkedOutBooks.splice(index, 1);
            book.isAvailable = true;
            return `Book "${book.title}" by ${book.author} returned successfully.`;
        }
        else {
            return "You did not check out this book from the library.";
        }
    }
}
exports.UserBase = UserBase;
class User extends UserBase {
    canCheckOutMoreBooks() {
        return this.checkedOutBooks.length < 3;
    }
}
exports.User = User;
