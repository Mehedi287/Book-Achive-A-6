//  addEventListener at search button ----------
document.getElementById('button').addEventListener('click', function () {
    const inputFlid = document.getElementById('input');
    const inputValue = inputFlid.value;
    inputFlid.value = '';
    getBooks(inputValue)

    // console.log(inputValue);
})
// fetch api -------------------------------
const getBooks = (bookName) => {
    fetch(`http://openlibrary.org/search.json?q= ${bookName}`)
        //https://covers.openlibrary.org/b/id/554106-M.jpg
        .then(res => res.json())
        .then(data => displayBook(data.docs))
}
const displayBook = books => {
    const container = document.getElementById('container');

    // console.log(books);
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card rounded">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
        </div>
        
        `;
        container.appendChild(div);


    })
}