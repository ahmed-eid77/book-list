class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    // Create tr Element
    const row = document.createElement("tr");
    // Insert Data
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    // Append to list
    list.appendChild(row);
  }

  showAlert(message, classN) {
    // create Div
    const div = document.createElement("div");
    // Add class name
    div.className = `alert ${classN}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    // Isert Alert
    container.insertBefore(div, form);

    // Time out
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  deletBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
      let books ;
      if(localStorage.getItem('books') === null){
          books = [];
      } else {
          books = JSON.parse(localStorage.getItem('books'))
      }

      return books;
  }

  static displayBook() {
    const books = Store.getBooks();

    books.forEach(function(book) {
        const ui = new UI;

        //Add To UI 
        ui.addBookToList(book)
    });
  }

  static addBook(book) {
      const books = Store.getBooks();

      books.push(book);
      localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(){

  }
}

//==========================================================================================
// DOM Loa Event 
document.addEventListener('DOMContentLoaded', Store.displayBook)



// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Create An Instance of Book
  const book = new Book(title, author, isbn);

  // Create An Instance of UI
  const ui = new UI();

  // Validation
  if (title === "" || author === "" || isbn === "") {
    //Error Alert
    ui.showAlert("please fill all fields", "error");
  } else {
    // Add Book to list
    ui.addBookToList(book);
    // Add Book To Local Storage
    Store.addBook(book);
    // Success Alert
    ui.showAlert("The book has been successfully added", "success");
    //Clear UI Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener For Delete Event
document.getElementById("book-list").addEventListener("click", function (e) {
  // Create An Instance of UI
  const ui = new UI();
  // Delete
  ui.deletBook(e.target);
  // Alert
  ui.showAlert("The book has been deleted", "success");

  e.preventDefault;
});
