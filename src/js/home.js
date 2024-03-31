import iziToast from 'izitoast';
import axios from 'axios';
import { renderModal } from './modal';

const listOne = document.querySelector('.list-one');
const listCategories = document.querySelector('.list_categories');
const titleSelectedCategory = document.querySelector('.main-title');
const loadingIndicator = document.querySelector(".container-loader");
const modal = document.querySelector(".box-modal-window");

let selectedCategory;
let number;

function isWidthDevice() {
  let widthWindow = window.innerWidth;

  if (widthWindow <= 767) return (number = 0);
  else if (widthWindow <= 1439) return (number = 2);
  else return (number = 4);
} 

function changeColorTitle() {
  const arrayTitle = titleSelectedCategory.textContent.split(' ');
  const lastWord = arrayTitle[arrayTitle.length - 1];
  titleSelectedCategory.innerHTML = titleSelectedCategory.innerHTML.replace(
    lastWord,
    `<span class="blue">${lastWord}</span>`
  );
}

////////get id after click//////////////
async function getId() {
  const childLi = document.querySelector(".image_book");
  const imgBook = document.querySelectorAll(".img-example");
  const child = document.querySelector(".book");
  const boxModal = document.querySelectorAll(".animation-paragraf");

    if(listOne.contains(childLi) || listOne.contains(child)) {
      boxModal.forEach(box => box.addEventListener("click", async (e) => {
      modal.style.display = "block";
      const id = e.target.dataset.category;
      await axios.get(`https://books-backend.p.goit.global/books/${id}`)
    .then(response => renderModal(response.data))
    .catch(error => error.message)
      }))
  }
}


////////list books on main page/////////

async function renderBooksMainPage(boo) {
  let stringOne = '';
  let stringTwo = '';
  const countBook = isWidthDevice();
  for (let i in boo) {
    stringOne += `
            <li class="books_list">
                <h2 class="name_category">${boo[i].list_name}</h2>
                <ul class="images_books">`;

    for (let j in boo[i].books) {
      stringOne += `<li class="image_book" data-category="${boo[i].books[j]._id}">
                                    <div class="div-animation">
                                            <img class="img-example" alt="Book title" src="${boo[i].books[j].book_image}"></img>
                                        <div class="box-quick-view"><p class="animation-paragraf" data-category="${boo[i].books[j]._id}">Quick view</p></div>
                                    </div>
                                
                                <div class="box-cards">
                                    <p class="title-book">${boo[i].books[j].title}</p>
                                    <p class="author-book">${boo[i].books[j].author}</p>
                                    <div class="rating">
                                      <svg class="icon-star" width="16" height="16"><use href="../img/sprite.svg#star"></use></svg>
                                      <span class="rating-number">${boo[i].books[j].rank_last_week}</span>
                                    </div>
                                </div>
                            </li>`;
      if (countBook == j) break;
    }
    stringOne += `</ul><button class="button-see-more" data-category="${boo[i].list_name}">See more</button></li>`;
  }
  listOne.insertAdjacentHTML('beforeend', stringOne);

  loadingIndicator.style.display = 'none';

  getId();
}

///if click on button "See more"////

listOne.addEventListener('click', async e => {
  if (e.target.classList.contains('button-see-more')) {
    loadingIndicator.style.display = 'block';
    listOne.innerHTML = '';
    const dataset = e.target.dataset.category;

    titleSelectedCategory.textContent = dataset;

    if (listCategories.querySelector('.categoria')) {
      const categoryItems = listCategories.querySelectorAll('.categoria');
      categoryItems.forEach(option => {
        if (titleSelectedCategory.textContent === option.textContent) {
          document.querySelector('.selected-categories').classList.remove('selected-categories');
          option.classList.add('selected-categories');
        }
      });
    }

    const arrayWords = titleSelectedCategory.textContent.split(' ');
    const word = arrayWords[arrayWords.length - 1];
    titleSelectedCategory.innerHTML = titleSelectedCategory.innerHTML.replace(
      word,
      `<span class="blue">${word}</span>`
    );

    await axios
      .get(
        `https://books-backend.p.goit.global/books/category?category=${dataset}`
      )
      .then(response => {
        if (response.data.length === 0) {
          throw new Error(
            `Sorry, books in the selected category were not found`
          );
        }
        renderBooks(response.data);
      })
      .catch(error =>
        iziToast.error({
          title: 'Error',
          message: error.message,
        })
      );
  }
});

async function updateBooksDisplay() {
  listOne.innerHTML = '';
  loadingIndicator.style.display = 'block';
  if (titleSelectedCategory.textContent === 'Best Sellers Books') {
    await axios
      .get(`https://books-backend.p.goit.global/books/top-books`)
      .then(response => {
        if (response.data.length === 0) {
          throw new Error(
            `Sorry, books in the selected category were not found`
          );
        }
        renderBooksMainPage(response.data);
      })
      .catch(error =>
        iziToast.error({
          title: 'Error',
          message: error.message,
        })
      );
  } else {
    await axios
      .get(
        `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
      )
      .then(response => {
        if (response.data.length === 0) {
          throw new Error(
            `Sorry, books in the selected category were not found`
          );
        }
        renderBooks(response.data);
      })
      .catch(error =>
        iziToast.error({
          title: 'Error',
          message: error.message,
        })
      );
  }
}
updateBooksDisplay();

//////list books on main page/////////

//////////changes in menu and searching books//////////////

async function renderCategories(list) {
  let listCard = '';
  const categoriaAll = `<li tabindex="0" data-name="Best Sellers Books" class="categoria selected-categories">All categories</li>`;
  list.forEach(option => {
    listCard += `<li tabindex="0" data-name="${option.list_name}" class="categoria">${option.list_name}</li>`;
  });
  listCategories.insertAdjacentHTML('beforeend', listCard);
  listCategories.insertAdjacentHTML('afterbegin', categoriaAll);

  const optionList = document.querySelectorAll('.categoria');

  optionList.forEach(select => {
    select.addEventListener('click', async e => {
      
    loadingIndicator.style.display = 'block';
    listOne.innerHTML = '';
      e.preventDefault();
      document
        .querySelector('.selected-categories')
        .classList.remove('selected-categories');
      e.target.classList.add('selected-categories');
      selectedCategory = e.target.textContent;
      selectedCategory = selectedCategory.replace(/ /g, '%20');

      if (e.target.textContent !== 'All categories') {
        titleSelectedCategory.textContent = e.target.textContent;
        changeColorTitle();

        await axios
          .get(
            `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
          )
          .then(response => {
            if (response.data.length === 0) {
              throw new Error(
                `Sorry, books in the selected category were not found`
              );
            }
            renderBooks(response.data);
          })
          .catch(error =>
            iziToast.error({
              title: 'Error',
              message: error.message,
            })
          );
      } else {
        titleSelectedCategory.textContent = 'Best Sellers Books';
        changeColorTitle();

        await axios
          .get(`https://books-backend.p.goit.global/books/top-books`)
          .then(response => {
            if (response.data.length === 0) {
              throw new Error(
                `Sorry, books in the selected category were not found`
              );
            }
            renderBooksMainPage(response.data);
          })
          .catch(error =>
            iziToast.error({
              title: 'Error',
              message: error.message,
            })
          );
      }
    });
  });
}

///////////changes in menu and searching books////////////////

///////////////list categories////////////////

axios
  .get(`https://books-backend.p.goit.global/books/category-list`)
  .then(response => {
    renderCategories(response.data);
  })
  .catch(error =>
    iziToast.error({
      title: 'Error',
      message: error.message,
    })
  );

//////////////list categories//////////////

async function renderBooks(books) {
  let booksCard = '';
  books.forEach( async book => {
    booksCard += `<li class="book" data-category="${book._id}">
                        <div class="div-animation">
                        <img data-category="${book._id}" class="img-example" alt="Book title" src="${book.book_image}"></img>
                            <div class="box-quick-view"><p data-category="${book._id}" class="animation-paragraf">Quick view</p></div>
                        </div>
                                <div class="box-cards">
                                    <p class="title-book">${book.title}</p>
                                    <p class="author-book">${book.author}</p>
                                    <div class="rating">
                                      <svg class="icon-star" width="16" height="16"><use href="../img/sprite.svg#star"></use></svg>
                                      <span class="rating-number">${book.rank_last_week}</span>
                                    </div>
                                </div>
                      </li>`;
  });
  listOne.insertAdjacentHTML('beforeend', booksCard);

  loadingIndicator.style.display = 'none';
  getId();
}