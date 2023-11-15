"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var account_1 = require("./account");
var data_1 = require("./data");
var Library = /** @class */ (function () {
    function Library() {
        this.books = data_1.default;
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.removeBook = function (book) {
        var index = this.books.findIndex(function (b) { return b === book; });
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    };
    Library.prototype.listAvailableBooks = function () {
        return this.books.filter(function (book) { return book.isAvailable; });
    };
    Library.prototype.searchBooks = function (query) {
        query = query.toLowerCase();
        return this.books.filter(function (book) {
            return book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        });
    };
    return Library;
}());
function displayOptions() {
    console.log("\nOptions:");
    console.log("1. List available books");
    console.log("2. Search for books");
    console.log("3. Check out a book");
    console.log("4. Return a book");
    console.log("5. Add a book");
    console.log("6. Exit");
}
// Example usage with input:
var library = new Library();
var user = new account_1.User();
var userInput;
var _loop_1 = function () {
    displayOptions();
    userInput = readlineSync.question('Enter your choice: ');
    switch (userInput) {
        case '1':
            var availableBooks = library.listAvailableBooks();
            console.log("Available Books:");
            availableBooks.forEach(function (book) { return console.log(book.title); });
            break;
        case '2':
            var searchQuery = readlineSync.question('Enter the title or author to search: ');
            console.log("Search Results:", library.searchBooks(searchQuery));
            break;
        case '3':
            var checkoutTitle = readlineSync.question('Enter the title of the book to check out: ');
            var matchingBooks = library.searchBooks(checkoutTitle);
            if (matchingBooks.length > 0) {
                console.log("Matching Books:");
                matchingBooks.forEach(function (book, index) {
                    console.log("".concat(index + 1, ". ").concat(book.title, " by ").concat(book.author));
                });
                var selectedBookIndex = readlineSync.keyInSelect(matchingBooks.map(function (book) { return book.title; }), 'Which book do you want to check out?');
                if (selectedBookIndex !== -1) {
                    var selectedBook = matchingBooks[selectedBookIndex];
                    console.log(user.checkOutBook(selectedBook));
                }
                else {
                    console.log("No book selected. Operation canceled.");
                }
            }
            else {
                console.log("No matching books found.");
            }
            break;
        case '4':
            var returnTitle_1 = readlineSync.question('Enter the title of the book to return: ');
            var returnBook = user.checkedOutBooks.find(function (b) { return b.title === returnTitle_1; });
            if (returnBook) {
                console.log(user.returnBook(returnBook));
            }
            else {
                console.log("You do not have this book checked out.");
            }
            break;
        case '5':
            var newBookTitle = readlineSync.question('Enter the title of the new book: ');
            var newBookAuthor = readlineSync.question('Enter the author of the new book: ');
            var newBook = new account_1.Book(newBookTitle, newBookAuthor);
            library.addBook(newBook);
            console.log("Book \"".concat(newBook.title, "\" by ").concat(newBook.author, " added successfully."));
            break;
        case '6':
            console.log("Exiting the program. Goodbye!");
            break;
        default:
            console.log("Invalid choice. Please enter a valid option (1-6).");
    }
};
while (userInput !== '6') {
    _loop_1();
}
