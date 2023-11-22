import * as readlineSync from 'readline-sync';
import { BookBase, User } from './account';
import { IBook } from './IBook';
import bookData from './data';

class Library {
  public books: IBook[] = bookData;

  public addBook(book: IBook): void {
    this.books.push(book);
  }

  public removeBook(book: IBook): void {
    const index = this.books.findIndex((b) => b === book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  public listAvailableBooks(): IBook[] {
    return this.books.filter((book) => book.isAvailable);
  }

  public searchBooks(query: string): IBook[] {
    query = query.toLowerCase();
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
  }
}

function displayOptions(): void {
  console.log("\nOptions:");
  console.log("1. List available books");
  console.log("2. Search for books");
  console.log("3. Check out a book");
  console.log("4. Return a book");
  console.log("5. Add a book");
  console.log("6. Exit");
}

function listAvailableBooks(library: Library): void {
  const availableBooks = library.listAvailableBooks();
  console.log("Available Books:");
  availableBooks.forEach((book) => console.log(book.title));
}

function searchForBooks(library: Library): void {
  const searchQuery = readlineSync.question('Enter the title or author to search: ');
  console.log("Search Results:", library.searchBooks(searchQuery));
}

function checkOutBook(library: Library, user: User): void {
  const checkoutTitle = readlineSync.question('Enter the title of the book to check out: ');
  const matchingBooks = library.searchBooks(checkoutTitle);

  if (matchingBooks.length > 0) {
    console.log("Matching Books:");
    matchingBooks.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author}`);
    });

    const selectedBookIndex = readlineSync.keyInSelect(
      matchingBooks.map((book) => book.title),
      'Which book do you want to check out?'
    );

    if (selectedBookIndex !== -1) {
      const selectedBook = matchingBooks[selectedBookIndex];
      console.log(user.checkOutBook(selectedBook));
    } else {
      console.log("No book selected. Operation canceled.");
    }
  } else {
    console.log("No matching books found.");
  }
}

function returnBook(user: User): void {
  const returnTitle = readlineSync.question('Enter the title of the book to return: ');
  const returnBook = user.checkedOutBooks.find((b) => b.title === returnTitle);
  if (returnBook) {
    console.log(user.returnBook(returnBook));
  } else {
    console.log("You do not have this book checked out.");
  }
}

function addBook(library: Library): void {
  const newBookTitle = readlineSync.question('Enter the title of the new book: ');
  const newBookAuthor = readlineSync.question('Enter the author of the new book: ');

  const newBook = new BookBase(newBookTitle, newBookAuthor);
  library.addBook(newBook);

  console.log(`Book "${newBook.title}" by ${newBook.author} added successfully.`);
}

const library = new Library();
const user = new User();

let userInput: string | undefined;

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
