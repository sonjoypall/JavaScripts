//............... Get the UI Element ...............//
let form = document.querySelector('#book_form');
let bookList = document.querySelector('#book_list');


//............... Book Classes .....................//
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//................. UI Classes ......................//
class UI {
    static addToBookList(book) {
        let list = document.querySelector('#book_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>`
        list.appendChild(row);
    }

    static clearFormFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static showAlert(message, classname) {
        let div = document.createElement('div');
        div.className = `alert ${classname}`;
        div.id = `alert_${classname}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book_form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    static deleteBookFromList(target) {
        if (target.hasAttribute('href')) {
            if (confirm('Are you sure?')) {
                let ele = target.parentElement.parentElement;
                ele.remove();
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                UI.showAlert("Book removed from list!", 'success');
            }
        }
    }
}

//................. Local Storage Class ......................//\
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addToBookList(book);
        });
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//................ Add Event Listener ...............//
form.addEventListener('submit', newBook);
bookList.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());


//................ Define Functions ..................//
// Add Book
function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill all the fields", "error");
    } else {
        let book = new Book(title, author, isbn);
        UI.addToBookList(book);
        UI.clearFormFields();
        UI.showAlert("You add a new book!", "success")
        Store.addBook(book);
    }
    e.preventDefault();
}

// Delete Book

function deleteBook(e) {
    UI.deleteBookFromList(e.target);
    e.preventDefault();
}