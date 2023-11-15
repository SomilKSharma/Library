"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserBase = exports.Book = exports.BookBase = void 0;
var BookBase = /** @class */ (function () {
    function BookBase(title, author, isAvailable) {
        if (isAvailable === void 0) { isAvailable = true; }
        this.title = title;
        this.author = author;
        this.isAvailable = isAvailable;
    }
    return BookBase;
}());
exports.BookBase = BookBase;
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Book;
}(BookBase));
exports.Book = Book;
var UserBase = /** @class */ (function () {
    function UserBase() {
        this.checkedOutBooks = [];
    }
    UserBase.prototype.checkOutBook = function (book) {
        if (this.checkedOutBooks.some(function (b) { return b.title === book.title && b.author === book.author; })) {
            return "You have already checked out this book.";
        }
        if (this.canCheckOutMoreBooks()) {
            this.checkedOutBooks.push(book);
            book.isAvailable = false;
            return "Book \"".concat(book.title, "\" by ").concat(book.author, " checked out successfully.");
        }
        else {
            return "You have reached the maximum limit of checked-out books. Please return some books to check out more.";
        }
    };
    UserBase.prototype.returnBook = function (book) {
        var index = this.checkedOutBooks.findIndex(function (b) { return b === book; });
        if (index !== -1) {
            this.checkedOutBooks.splice(index, 1);
            book.isAvailable = true;
            return "Book \"".concat(book.title, "\" by ").concat(book.author, " returned successfully.");
        }
        else {
            return "You did not check out this book from the library.";
        }
    };
    return UserBase;
}());
exports.UserBase = UserBase;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.canCheckOutMoreBooks = function () {
        return this.checkedOutBooks.length < 3;
    };
    return User;
}(UserBase));
exports.User = User;
