"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const account_1 = require("./account");
const data_1 = __importDefault(require("./data"));
class Library {
    constructor() {
        this.books = data_1.default;
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(book) {
        const index = this.books.findIndex((b) => b === book);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }
    listAvailableBooks() {
        return this.books.filter((book) => book.isAvailable);
    }
    searchBooks(query) {
        query = query.toLowerCase();
        return this.books.filter((book) => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
    }
}
function displayOptions() {
    console.log("\nOptions:");
    console.log("1. List available books");
    console.log("2. Search for books");
    console.log("3. Check out a book");
    console.log("4. Return a book");
    console.log("5. Add a book");
    console.log("6. Exit");
}
function listAvailableBooks(library) {
    const availableBooks = library.listAvailableBooks();
    console.log("Available Books:");
    availableBooks.forEach((book) => console.log(book.title));
}
function searchForBooks(library) {
    const searchQuery = readlineSync.question('Enter the title or author to search: ');
    console.log("Search Results:", library.searchBooks(searchQuery));
}
function checkOutBook(library, user) {
    const checkoutTitle = readlineSync.question('Enter the title of the book to check out: ');
    const matchingBooks = library.searchBooks(checkoutTitle);
    if (matchingBooks.length > 0) {
        console.log("Matching Books:");
        matchingBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} by ${book.author}`);
        });
        const selectedBookIndex = readlineSync.keyInSelect(matchingBooks.map((book) => book.title), 'Which book do you want to check out?');
        if (selectedBookIndex !== -1) {
            const selectedBook = matchingBooks[selectedBookIndex];
            console.log(user.checkOutBook(selectedBook));
        }
        else {
            console.log("No book selected. Operation canceled.");
        }
    }
    else {
        console.log("No matching books found.");
    }
}
function returnBook(user) {
    const returnTitle = readlineSync.question('Enter the title of the book to return: ');
    const returnBook = user.checkedOutBooks.find((b) => b.title === returnTitle);
    if (returnBook) {
        console.log(user.returnBook(returnBook));
    }
    else {
        console.log("You do not have this book checked out.");
    }
}
function addBook(library) {
    const newBookTitle = readlineSync.question('Enter the title of the new book: ');
    const newBookAuthor = readlineSync.question('Enter the author of the new book: ');
    const newBook = new account_1.Book(newBookTitle, newBookAuthor);
    library.addBook(newBook);
    console.log(`Book "${newBook.title}" by ${newBook.author} added successfully.`);
}
const library = new Library();
const user = new account_1.User();
let userInput;
while (userInput !== '6') {
    displayOptions();
    userInput = readlineSync.question('Enter your choice: ');
    switch (userInput) {
        case '1':
            listAvailableBooks(library);
            break;
        case '2':
            searchForBooks(library);
            break;
        case '3':
            checkOutBook(library, user);
            break;
        case '4':
            returnBook(user);
            break;
        case '5':
            addBook(library);
            break;
        case '6':
            console.log("Exiting the program. Goodbye!");
            break;
        default:
            console.log("Invalid choice. Please enter a valid option (1-6).");
    }
}
