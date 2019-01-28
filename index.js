function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UserInput(){}

UserInput.prototype.addBookToList = function(book){
    let list = document.getElementById('book-list');
    let row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td> <a href="#" class='delete'>X<a></td>`;
    list.appendChild(row);
}

UserInput.prototype.alertMsg = function(message, className){
    let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
    let container = document.querySelector('.container');    
    let form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },2000);
    }

    UserInput.prototype.deleteBook = function(target) {
        if (target.className === 'delete') {
          // Delete row: a > td> tr
          target.parentElement.parentElement.remove();
     
          // *** Show message ***
          UserInput.prototype.alertMsg('Book Removed', 'success');
        }
}


UserInput.prototype.clearInput = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e){
    
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;

    let book = new Book(title, author, isbn);

    let userInput = new UserInput();
    if(title === '' || author === '' || isbn === ''){
        userInput.alertMsg('Please fill in all fields', 'error');
    } else {
        userInput.addBookToList(book);
        userInput.alertMsg('Book added', 'success');

        userInput.clearInput();
    }

      e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e){
    let userInput = new UserInput();
    userInput.deleteBook(e.target);

    e.preventDefault();
})

