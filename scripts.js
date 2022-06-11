







// quick start Javascript

function displayBook(book, index){

  // HTML format is based on bootstrap:

  // <div class="card" style="width: 18rem;" data-index="1">
  //   <div class="card-body">
  //     <h2 class="card-title">The Success Principles wefw</h2>
  //     <h3 class="card-subtitle mb-2 text-muted">Jack Canfield</h3>
  //     <p class="card-text">No. of pages: 69 </p>
  //     <button type="button" class="btn btn-outline-primary" data-index="1">Unread</button>
  //     <br>
  //     <p class="remove-link">
  //       <a href="#">Remove book</a>
  //     </p>
  //   </div>
  // </div>

  card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("style","width: 18rem;");
  card.setAttribute("data-index", index);
  container.appendChild(card);
  
  cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  cardTitle = document.createElement("h2");
  cardTitle.appendChild(document.createTextNode(book.title));
  cardTitle.classList.add("card-title");
  cardBody.appendChild(cardTitle);

  cardSubtitle = document.createElement("h3");
  cardSubtitle.appendChild(document.createTextNode(book.author));
  cardSubtitle.setAttribute("class","card-subtitle mb-2 text-muted");
  cardBody.appendChild(cardSubtitle);

  cardText = document.createElement("p");
  cardText.appendChild(document.createTextNode("No. of pages: " + book.pages));
  cardText.classList.add("card-text");
  cardBody.appendChild(cardText);

  readButton = document.createElement("button");
  readButton.setAttribute("type","button");
  readButton.setAttribute("data-index", index);
  if(book.read){
    readButton.setAttribute("class","btn btn-primary");
    readButton.appendChild(document.createTextNode("Read"));
  } else {
    readButton.setAttribute("class","btn btn-outline-primary");
    readButton.appendChild(document.createTextNode("Unread"));
  }
  readButton.addEventListener("click", () => changeRead(index) );
  cardBody.appendChild(readButton);

  linebreak = document.createElement("br");
  cardBody.appendChild(linebreak);
  
  removeLink = document.createElement("p");
  removeLink.classList.add("remove-link");
  removeLink.addEventListener("click", () => removeBook(index) )
  cardBody.appendChild(removeLink);

  hyperlink = document.createElement("a");
  hyperlink.appendChild(document.createTextNode("Remove book"));
  hyperlink.setAttribute("href","#");
  removeLink.appendChild(hyperlink);
}

function openForm(){ overlay.style.display = "flex"; };
function closeForm(){ overlay.style.display = "none"; };

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function saveToMemory(){
  memory.clear();
  memory.setItem("myLibrary", JSON.stringify(myLibrary));
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  saveToMemory();
}

function clearForm(){
  title.value = "";
  author.value = "";
  pages.value = "";
  readForm.checked = false;
}

function removeBook(index){
  let rejectBook = document.querySelector(`[data-index="${index}"][style="width: 18rem;"]`);
  rejectBook.style.display = "none";

  myLibrary[index] = false;
  saveToMemory();
}

function changeRead(index){
  let statusButton = document.querySelector(`[data-index="${index}"][type="button"]`);
    
  if (myLibrary[index].read){
    statusButton.setAttribute("class","btn btn-outline-primary");
    statusButton.textContent = "Unread";
    myLibrary[index].read = false;
  } else {
    statusButton.setAttribute("class","btn btn-primary");
    statusButton.textContent = "Read";
    myLibrary[index].read = true;
  }
  
  saveToMemory();
}


// Initial variables
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const openFormButton  = document.querySelector(".open-form");
const closeFormButton = document.querySelector(".close-form");
const submitForm = document.querySelector(".submit-form");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readForm = document.querySelector("#read-form");

let card, cardBody, cardTitle, cardSubtitle, cardText, readButton, removeLink, hyperlink, linebreak;


// Retreive myLibrary from memory and display all books
let myLibrary = [];
let memory = window.localStorage;
if (memory.getItem("myLibrary")){
  myLibrary = JSON.parse(memory.getItem("myLibrary"));
  for(var x in myLibrary) {
    if(myLibrary[x]){
      displayBook(myLibrary[x], x);
    }
  }
} 


// Open, close, and submit form
openFormButton.addEventListener("click", () => openForm());
closeFormButton.addEventListener("click", () => closeForm());
submitForm.addEventListener("click", () => {
  let newBook = new Book(title.value, author.value, pages.value, readForm.checked);
  addBookToLibrary(newBook);
  displayBook(newBook, myLibrary.length - 1);
  clearForm();
  closeForm();
})
