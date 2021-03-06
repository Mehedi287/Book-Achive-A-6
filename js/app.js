const serchBtn = document.getElementById('button');
const inputFlid = document.getElementById('input');
inputFlid.addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
        serchBtn.click();
    }
})



//  -----------addEventListener at search button ----------
document.getElementById('button').addEventListener('click', function () {
    const inputFlid = document.getElementById('input');
    const inputValue = inputFlid.value;
    inputFlid.value = '';
    //--------------- throw error for empty search ------------
    if (inputValue === '') {
        alert('please write something');
    }
    else {
        getBooks(inputValue);
    }
});
//---------------- set spinner------------------- 
const toggleSpiner = displayStyle => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = displayStyle;
};
// ----------------------fetch api ----------------------
const getBooks = (bookName) => {
    toggleSpiner('block');
    fetch(`https://openlibrary.org/search.json?q= ${bookName}`)
        .then(res => res.json())
        .then(data => displayBook(data.docs))
}
// --------------------show searching result ----------------
const displayBook = books => {

    const container = document.getElementById('container');
    container.textContent = '';

    //    --------------get  total result container --------------
    const totalResult = document.getElementById('total-result');
    totalResult.textContent = '';
    const h1 = document.createElement('h1');
    h1.innerText = `Total Result :  ${books.length}`;
    totalResult.appendChild(h1);
    // ----------------------set show result----------------
    const showResult = document.getElementById('show-result');
    showResult.textContent = '';
    const h2 = document.createElement('h2');
    h2.innerText = `Show Result : ${books.slice(0, 15).length}`;
    showResult.appendChild(h2)
    // ------------set error for unacepcted result----------- 
    if (books.length === 0) {
        alert('Your Result is Not Found')
    }
    else {
        books.slice(0, 15).forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card rounded">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Book Name : ${book.title}</h5>
                            <p>Author Name : ${book.author_name ? book.author_name : 'Not Found'}</p>
                            <p> Frist Published : ${book.publish_date ? book.publish_date : 'there is No published date'}</p>
                            <p class="card-text">Language :  ${book.language ? book.language : 'Not Found'}</p>
                            <p class="card-text">Publisher :  ${book.publisher_facet ? book.publisher_facet : 'Not Found'}</p>
                            <p class="card-text">Type :  ${book.type ? book.type : 'Not Found'}</p>
                        </div>
            </div>
            `;
            container.appendChild(div);
        })
    }
    toggleSpiner('none');
}
//-----------
