console.log("This is index.js");


displayLocalStorage()

// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;



}


// Display Constructor
function Display() {


}



// Add Method to Display Prototype


// Adding book Object to the UI
Display.prototype.add = function (book) {

    console.log("Added to localStorage");

    addToLocalStorage(book)




    console.log("Adding to UI");
    displayLocalStorage()


    // let tableBody = document.getElementById("tableBody")



    // let uiString;
    // uiString = `<tr>    
    //                 <td>${book.name}</td>
    //                 <td>${book.author}</td>
    //                 <td>${book.type}</td>
    //             </tr>`


    // tableBody.innerHTML += uiString;




}


// Implementing the Clear Function
Display.prototype.clear = function () {

    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();

}


// Implementing the Validate Function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;

    }

    else {
        return true;
    }


}

//  Implementing the Show Function

Display.prototype.show = function (type, messages) {

    let message = document.getElementById("message")

    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message :</strong> ${messages}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`


    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);

}


// Add Submit Event Listener to libraryForm


let libraryForm = document.getElementById("libraryForm")

libraryForm.addEventListener("submit", libraryFormSubmit)

function libraryFormSubmit(e) {

    console.log("You have Submited Form");


    let name = document.getElementById("bookName").value;
    let author = document.getElementById("Author").value;


    // fiction , programming, cooking 
    let fiction = document.getElementById("fiction")
    let programming = document.getElementById("programming")
    let cooking = document.getElementById("cooking")


    let type;
    if (fiction.checked) {
        type = fiction.value;

    }

    else if (programming.checked) {
        type = programming.value;

    } else {

        type = cooking.value

    }




    let book = new Book(name, author, type)

    console.log(book);


    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show("success", "Your Book is Sucessfully Added.")
    }

    else {

        // Show Error to the User
        display.show("danger", "Sorry you cannot add this Book.")
        display.clear();
    }



    e.preventDefault();


}







/* To do  list

1. Store all the data on local Storage
2. give the another column as an option to delete the book
3. Add Scroll Bar to the View


*/


// Storing to local Storage 


function addToLocalStorage(book) {

    let item = localStorage.getItem("items")
    if (item == null) {
        console.log("Null");
        itemObj = []

    }

    else {

        itemObj = JSON.parse(item)
    }

    itemObj.push(book)
    localStorage.setItem("items", JSON.stringify(itemObj))

}



// Display Function

function displayLocalStorage() {

    let item = localStorage.getItem("items")
    if (item == null) {
        console.log("Null");
        itemObj = [];

    }

    else {

        itemObj = JSON.parse(item);
    }


    let uiString = "";

    itemObj.forEach(function (element, index) {

        uiString += `<tr> 
                        <th scope="row">${index + 1}</th>   
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteBtn(${index})">Delete</button></td>
                    </tr>`


    });


    let tableBody = document.getElementById("tableBody")
    let tableHeading = document.getElementById("tableHeading")

    if (itemObj.length != 0) {
        tableHeading.style.visibility = "visible";
        tableBody.innerHTML = uiString;

    }

    else {
        tableHeading.style.visibility = "hidden";
        tableBody.innerHTML = `<b> No Books Currently Available. Please Add on the Book </b>`
    }


}




// Delete Function
function deleteBtn(index) {
    console.log("Delete", index);

    let item = localStorage.getItem("items")
    if (item == null) {
        console.log("Null");
        itemObj = []

    }

    else {

        itemObj = JSON.parse(item)
    }


    itemObj.splice(index, 1)

    localStorage.setItem("items", JSON.stringify(itemObj))



    displayLocalStorage()



}


// Delete All Books


function deleteAllBooks() {

    console.log("Confirmation Box");

    let mymodal = document.getElementById("mymodal")
    mymodal.style.display = "block";

    let mainDiv = document.getElementById("mainDiv")
    mainDiv.style.display = "none";
    displayLocalStorage()


}

// If Press Yes To Delete the Book

function yesBtn() {

    console.log("All Books are Deleted");
    localStorage.clear()

    let mainDiv = document.getElementById("mainDiv")
    mainDiv.style.display = "block";

    displayLocalStorage()

    location.reload()

}


// If Press No To delete the Book

function noBtn() {
    let mainDiv = document.getElementById("mainDiv")
    mainDiv.style.display = "block";


}

 