const topMain = document.getElementById('top-main');
const close = document.getElementById('close');
const formsJS = document.getElementById('submitButton');
const library = document.getElementById('bottom-main')
const openBook = document.getElementById('template');
const popUpsContainer = document.getElementsByTagName("BODY")[0];

//click events
topMain.addEventListener('click', e => {
    document.getElementById('form-container').classList.add('mostrar');
})

close.addEventListener('click', e => {
    document.getElementById('form-container').classList.remove('mostrar');
})





let popLibrary = [];
let domLibrary = [];
let myLibrary = [];
let booksAdded = 0;


class Book {
    constructor(title, author, pages, haveIRead, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveIRead = haveIRead;
        this.index = index;
    }

}

formsJS.addEventListener('click', e => {
    e.preventDefault();
    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('bookAuthor').value;
    let pages = document.getElementById('bookPages').value;
    let iHaveRead = document.getElementsByName('iHaveRead');

    if (iHaveRead[0].checked) {
        iHaveRead[0].value = true;
    } else {
        iHaveRead[0].value = false;
    }

    addBookToLibrary(title, author, pages, iHaveRead[0].value);
})

function addBookToLibrary(title, author, pages, iHaveRead) {
    // bookIndex
    booksAdded++;


    let book = new Book(title, author, pages, iHaveRead, booksAdded);
    myLibrary.push(book);

    // creating book on library
    let bookContainer = document.createElement('div');
    bookContainer.id = "template";

    let bookTitle = document.createElement('h2');
    bookTitle.id = 'title-overlay';
    bookTitle.innerText = `${title}`;

    let image = document.createElement('img');
    image.src = "book.png";
    image.id = "book";

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(image);
    bookContainer.dataset.index = booksAdded;

    // creating book pop-up 

    let popUpContainer = document.createElement('div');
    popUpContainer.classList.add('form-container');
    popUpContainer.dataset.index = booksAdded;

    let popUp = document.createElement('div');
    popUp.classList.add('form');

    let closeButton = document.createElement('button');
    closeButton.id = 'close';
    closeButton.innerText = 'X';

    let bookTitlePop = document.createElement('h2');
    bookTitlePop.id = "pop-title";
    bookTitlePop.innerText = `${title}`

    let bookAuthorPop = document.createElement('p');
    bookAuthorPop.classList.add('bookDetails');
    bookAuthorPop.innerText = `Author: ${author}`

    let numberOfPages = document.createElement('p');
    numberOfPages.classList.add('bookDetails');
    numberOfPages.innerText = `Pages: ${pages}`

    let iHaveReadButton = document.createElement('button');
    iHaveReadButton.classList.add('bookDetails');
    iHaveReadButton.classList.add('bookButtons');
    iHaveReadButton.dataset.index = booksAdded;


    if (iHaveRead == 'true') {
        iHaveReadButton.innerText = `I HAVE READ`;
    } else {
        iHaveReadButton.innerText = `I HAVEN'T READ`;
    }


    let removeButton = document.createElement('button');
    removeButton.classList.add('bookDetails');
    removeButton.classList.add('bookButtons');
    removeButton.innerText = 'REMOVE BOOK'
    removeButton.dataset.index = booksAdded;

    popUp.appendChild(closeButton);
    popUp.appendChild(bookTitlePop);
    popUp.appendChild(bookAuthorPop);
    popUp.appendChild(numberOfPages);
    popUp.appendChild(iHaveReadButton);
    popUp.appendChild(removeButton);
    popUpContainer.appendChild(popUp);

    library.appendChild(bookContainer);
    domLibrary.push(bookContainer);
    popLibrary.push(popUpContainer);
    popUpsContainer.appendChild(popUpContainer);

    //creating book event listener
    bookContainer.addEventListener('click', e => {
        popLibrary.forEach(element => {
            if (element.dataset.index == bookContainer.dataset.index) {
                element.classList.add('mostrar');
            }
        });
    })
    //creating close event listener
    closeButton.addEventListener('click', e => {
        popLibrary.forEach(element => {
            if (element.dataset.index == bookContainer.dataset.index) {
                element.classList.remove('mostrar');
            }
        });
    })

    iHaveReadButton.addEventListener('click', e => {
        popLibrary.forEach(element => {
            if (element.dataset.index == iHaveReadButton.dataset.index) {
                let list = element.firstChild.childNodes;

                if (list[4].innerText == 'I HAVE READ') {
                    list[4].innerText = "I HAVEN'T READ"
                } else if (list[4].innerText == "I HAVEN'T READ") {
                    list[4].innerText = "I HAVE READ"
                }

            }
        });
        myLibrary.forEach(element => {
            if (element['index'] == iHaveReadButton.dataset.index) {
                if (element['iHaveRead'] == 'true') {
                    element['iHaveRead'] == 'false'
                } else {
                    element['iHaveRead'] == 'true'
                }
            }
        })
    })

}





