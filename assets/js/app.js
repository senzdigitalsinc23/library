
//Helper functions for creating and setting elements on DOM
function createElements(element, text = "") {

    let create = document.createElement(element)

    create.textContent = text;

    return create;
}


function setAttributes(attributes, elements = "" | []) {
    let properties = Object.keys(attributes);
    let values = Object.values(attributes);

    let attribs = "";

    let valueCount = 0;

   if (Array.isArray(elements)) {
        elements.map((element) => {
            for (let i = 0; i < Object.keys(attributes).length; i++) {
            
                element.setAttribute(properties[i], values[i]);
            }
        })
   }else {
        for (let i = 0; i < Object.keys(attributes).length; i++) {
            
            elements.setAttribute(properties[i], values[i]);
        }
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

//Methods to add Functionality
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

addBookToLibrary();

function clearModal() {
    txtBookAuthor.value = "";
    txtTitle.value = "";
    numNumberOfPages.value = "";
}


//Create elements and variables

let bookCard = "";
let author = "";
let bookTitle = "";
let pages = "";
let bookRead = "";
let thumbnail = "";
let delButton = '';

let container = document.querySelector('.container');
let gridContainer = document.createElement('div');
let dialogModal = createElements('dialog');
let dialogHeader = createElements('h3', "Enter Book Details");
let dialogForm = createElements('form');
let dialogButton = createElements('button', "Submit")
let txtBookAuthor = createElements('input');
let txtTitle = createElements('input');
let numNumberOfPages = createElements('input');

let btnAddBook = createElements('button', "Add Book");

btnAddBook.classList.add('add-book')
gridContainer.classList.add('grid-container');

setAttributes({
    'open':""
}, dialogModal)

setAttributes({'class': 'btn-submit'}, dialogButton)
setAttributes({'method': 'dialog'}, dialogForm);

let count = 0;

function loadBooks() {
    myLibrary.map((book) => {
        bookCard  = createElements('div');
        bookCard.classList.add('book-card');
    
        author  = createElements('div', book.author);
        author.classList.add('author');
    
        thumbnail = createElements('img');
        thumbnail.classList.add('thumbnail')
    
        setAttributes({'src': "../assets/images/thehobbit.jpg", 'alt': book.title}, thumbnail)
    
        bookTitle  = createElements('div', book.title);
        bookTitle.classList.add('book-title');
    
        pages  = createElements('div', book.pages + " pages");
        pages.classList.add('pages');
    
        bookRead  = createElements('div', "Status: " + (book.read ? "Read" : "Not read yet"));
        bookRead.classList.add('status');
    
        author = createElements('h3', "By: " + book.author);
    
        pages = createElements('h4', book.numberOfPages + " pages.")
    
        setAttributes({'style':"margin: 6px 10px;"}, [author, pages])
    
        let thumbnailContainer = createElements("div");
        thumbnailContainer.classList.add("thumbnail-container");
    
        let deleteImg = createElements('img');
        setAttributes({'style': "width: 15px", 'src': "../assets/images/delete-red.png"}, deleteImg)
    
        let btnRemoveBook = createElements('button');
        setAttributes({'class': "btn-remove", 'data-btn-remove': "book-" + count + "-remove"}, btnRemoveBook)
    
        let btnStatus = createElements('button', 'Not Read');
        setAttributes({'class': "btn-status",'data-btn-status': "book-" + count + "-status"}, btnStatus);
    
        attachElements(btnRemoveBook, deleteImg);
    
        attachElements(thumbnailContainer, thumbnail)
        attachElements(bookCard, [bookTitle, thumbnailContainer, author, pages, btnStatus, btnRemoveBook]);
        attachElements(gridContainer, bookCard);
    
        count++;
    
    })
    
    attachElements(container, btnAddBook);
    
    attachElements(dialogForm, [dialogHeader, txtTitle, txtBookAuthor, numNumberOfPages,dialogButton])
    attachElements(dialogModal, dialogForm);
    attachElements(gridContainer, dialogModal);
    attachElements(container, gridContainer);
}

loadBooks();

//Events
dialogButton.onclick = (e) => {
    clearModal();

    dialogModal.close();
    e.preventDefault();
}

btnAddBook.onclick = () => {
    dialogModal.showModal();
}

