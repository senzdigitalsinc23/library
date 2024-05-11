const myLibrary = [];

function Book(title, author, numberOfPages, read = false) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;

    this.info = () => {
        return (this.title + " by " + this.author + ", " + this.numberOfPages + " pages, " + (read ? "read" : "not read yet"));
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295');
const newBook1 = new Book('Atomic Habbits', 'James Clear', '290', true);
const newBook2 = new Book('The demon of unrest', 'Erik Larson', '295', true);
const newBook3 = new Book('Say More', 'Jen Psaki', '310');
const newBook4 = new Book('Indian Cooking', 'Madhur Jaffery', '184', true);

function addBookToLibrary() {
    myLibrary.push(theHobbit, newBook1, newBook2, newBook3, newBook4);
}

addBookToLibrary();

//Create elements
//Helper functions for creating and setting elements on DOM
function createElements(element, text = "") {

    let create = document.createElement(element)

    create.textContent = text;

    return create;
}


function setAttributes(attributes, element) {
    let properties = Object.keys(attributes);
    let values = Object.values(attributes);

    let attribs = "";

    let valueCount = 0;

   for (let i = 0; i < Object.keys(attributes).length; i++) {
        attribs = attribs + properties[i] + ": " + values[i] + ";";
        
        element.setAttribute(properties[i], values[i]) 
    }
    
     
}

function attachElements(parent, children = "" | []) {
    if (Array.isArray(children)) {
        children.map((child) => {
            parent.append(child);
        })
    }else{
        parent.append(children);
    }
}


//Create elements
let container = document.querySelector('.container');
let gridContainer = document.createElement('div');
let dialogModal = createElements('dialog');
let dialogHeader = createElements('h2', "Enter Book Details");


let bookCard = "";
let author = "";
let bookTitleTitle = "";
let pages = "";
let bookRead = "";
let thumbnail = "";
let delButton = '';

let btnAddBook = createElements('button', "Add Book");

btnAddBook.classList.add('add-book')
gridContainer.classList.add('grid-container');

attachElements(container, btnAddBook);

/* 
<div class="grid-container">
            <dialog close>
                <p>Enter Book Details to Add</p>
                <form method="dialog">
                <button>OK</button>
                </form>
            </dialog>
        </div>
*/

setAttributes({
    'open': ''
}, dialogModal)

attachElements(gridContainer, dialogModal)
attachElements(container, gridContainer);

myLibrary.map((book) => {
    bookCard  = createElements('div');
    bookCard.classList.add('book-card');

    author  = createElements('div', book.author);
    author.classList.add('author');

    thumbnail = createElements('img');
    thumbnail.classList.add('thumbnail')

    bookTitle  = createElements('div', book.title);
    bookTitle.classList.add('book-title');

    pages  = createElements('div', book.pages + " pages");
    pages.classList.add('pages');

    bookRead  = createElements('div', "Status: " + (book.read ? "Read" : "Not read yet"));
    bookRead.classList.add('status');

    attachElements(bookCard, [bookTitle, thumbnail]);
    attachElements(gridContainer, bookCard);

})
