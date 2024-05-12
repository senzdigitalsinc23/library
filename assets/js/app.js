
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
let myLibrary = [];

function Book(title, author, numberOfPages, read = false) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;

    this.info = () => {
        return (this.title + " by " + this.author + ", " + this.numberOfPages + " pages, " + (read ? "read" : "not read yet"));
    }
}


//Create elements and variables

let bookCard = "";
let author = "";
let bookTitle = "";
let pages = "";
let bookRead = "";
let bookReadStatus = false;
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
let countTrack = createElements('div')

let btnAddBook = createElements('button', "Add Book");

let topBar = createElements('div');

btnAddBook.classList.add('add-book')
gridContainer.classList.add('grid-container');

setAttributes({'class': 'btn-submit'}, dialogButton)
setAttributes({'method': 'dialog'}, dialogForm);

setAttributes({'type': "text"}, [txtBookAuthor, txtTitle]);
setAttributes({'type': "number", 'min': "2", 'value': "2"}, numNumberOfPages)

setAttributes({'name': "txt-book-title"}, txtTitle);
setAttributes({'name': "txt-book-author"}, txtBookAuthor);
setAttributes({'name': "txt-book-pages"}, numNumberOfPages);

setAttributes({'class':"top-bar"}, topBar);
setAttributes({'class':"count-track"}, countTrack)

let countItems = 0;
let booksRead = 0;

let thehobbit = new Book("The Hobbit", "J.R.R Tolkien", "295");
let chaos = new Book("Chaos", "Charles Manson", "258", true);
let theWoman = new Book("The Woman", "Kristin Hannah", "185");
let atomicHabits = new Book("Atomic Habits", "James Clear", "315");
let demonUnrest = new Book("The Demon of unrest", "Erik Larson", "95");

//let defaultBooks 

myLibrary = [thehobbit, chaos, theWoman, atomicHabits, demonUnrest];
let totalBooks = myLibrary.length;

function addBookToLibrary(bookObj = "") {

    if (bookObj !== "") {        
        myLibrary.push(bookObj)
    }
    
}


function loadBooks() {

    myLibrary.map((book) => {
        bookCard  = createElements('div');
        bookCard.classList.add('book-card-' + countItems);
    
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
        setAttributes({'class': "btn-remove", 'id': countItems}, btnRemoveBook)

        let btnStatus = createElements('button', 'Not Read');
        setAttributes({'class': "btn-status-" + countItems, 'id': countItems}, btnStatus);
    
       
        attachElements(btnRemoveBook, deleteImg);
    
        attachElements(thumbnailContainer, thumbnail)
        attachElements(bookCard, [bookTitle, thumbnailContainer, author, pages, btnStatus, btnRemoveBook]);
        attachElements(gridContainer, bookCard);      

        countItems++;
    })
   
    let getAllBooks = document.querySelectorAll("[class ^='btn-remove']");
    let bookStatus = document.querySelectorAll("[class ^='btn-status-']");

    

    dialogButton.onclick = () => {
        if (txtTitle.value === "" || txtBookAuthor.value === "") {
            alert("To add a book, enter book title and author name")
        }else{
            myLibrary = [];
           addBookToLibrary(new Book(txtTitle.value, txtBookAuthor.value, numNumberOfPages.value));
            
           totalBooks++;

           totalBooksDiv.textContent = "Total Books : " + totalBooks

           loadBooks();   
        }

        getAllBooks = document.querySelectorAll("[class ^='btn-remove']");
        bookStatus = document.querySelectorAll("[class ^='btn-status-']");

    }


    getAllBooks.forEach(book => {
        book.onclick = () => {
            let bookC = document.querySelector('.book-card-'+ book.id);
            
            let bookState = document.querySelector('.btn-status-' + book.id).textContent;
        
            if (booksRead !== 0 && bookState === "Read") {
                booksRead--;

                booksReadDiv.textContent = "Books Read : " + booksRead
            }
            
            totalBooks--;

            totalBooksDiv.textContent = "Total Books : " + totalBooks

            bookC.remove()        
        }
    })

    bookStatus.forEach(book => {
        book.onclick = () => {
            let status = book.textContent;
          
            if (status ===  "Not Read") {
                book.textContent = "Read";
                setAttributes({'style':"color:white; background-color:green; transition: all 0.5s ease-in-out;padding: 5px 25px"}, book);

                booksRead++;
            }else{
                book.textContent = "Not Read";
                setAttributes({'style':"color:red; background-color:lightblue; transition: all 0.5s ease-in-out;"}, book);

                booksRead--;              
            }

            booksReadDiv.textContent = "Books Read : " + booksRead
        }
    })
      
}


let totalBooksDiv = createElements('h3', "Total Books : " + totalBooks);
let booksReadDiv = createElements('h3', "Books Read : " + booksRead)

setAttributes({
    'style' : "color: dodgerblue; font-size: 2.5rem;margin: 10px 20px"
}, [totalBooksDiv, booksReadDiv])
 
attachElements(dialogForm, [dialogHeader, txtTitle, txtBookAuthor, numNumberOfPages,dialogButton])
attachElements(dialogModal, dialogForm);
attachElements(topBar, [btnAddBook, countTrack]);
attachElements(countTrack, [totalBooksDiv, booksReadDiv])
attachElements(container, [topBar, gridContainer, dialogModal]);

addBookToLibrary()
loadBooks();

btnAddBook.onclick = () => {
    dialogModal.showModal();
}


