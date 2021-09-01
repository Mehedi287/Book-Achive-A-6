//  addEventListener at search button ----------
document.getElementById('button').addEventListener('click', function () {
    const inputFlid = document.getElementById('input');
    const inputValue = inputFlid.value;
    inputFlid.value = '';
    if (inputValue === '') {
        alert('please write something');
    }
    else { getBooks(inputValue); }
    // console.log(inputValue);
});
// fetch api -------------------------------
const getBooks = (bookName) => {
    fetch(`http://openlibrary.org/search.json?q= ${bookName}`)
        //https://covers.openlibrary.org/b/id/554106-M.jpg
        .then(res => res.json())
        .then(data => displayBook(data.docs))
}
const displayBook = books => {
    const totalResult = document.getElementById('total-result');
    const h1 = document.createElement('h1');
    h1.innerText = `Total Result :  ${books.length}`;
    totalResult.appendChild(h1)
    const container = document.getElementById('container');
    console.log(books.length);
    if (books.length === 0) {
        alert('Your Result is Not Found')
    }
    else {
        // console.log(books);
        books.forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card rounded">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="card-img-top img" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Book Name : ${book.title}</h5>
                            <p>Author Name : ${book.author_name}</p>
                            <p> Frist Published : ${book.publish_date}</p>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                        </div>
            </div>
            `;
            container.appendChild(div);
        })
    }
}
//-----------
