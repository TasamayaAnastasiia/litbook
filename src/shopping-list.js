import axios from "axios";
const buttonToHome = document.querySelector(".home");
const shopList = document.querySelector(".shop-list");
const amountCircle = document.querySelector(".circle-amount");
const listShop = document.querySelector(".shop-list-bk");
const boxForEmpty = document.querySelector(".bx-shp");
let arrayBook = JSON.parse(localStorage.getItem("id"));


if (buttonToHome.classList.contains("yellow-draw")) {
    buttonToHome.classList.remove("yellow-draw");
    shopList.classList.add("yellow-draw");
}
amountCircle.style.display = "none";

async function renderShop(books) {
    let strRender = ``;
    strRender += `<li class="option-list-bk">
                    <a data-rem="${books._id}" class="circle-remove" href=""><svg data-rem="${books._id}" width="18" height="18"><use href="./img/sprite.svg#remove"></use></svg></a>
                        <img class="img-bk" alt="" src="${books.book_image}"/>
                        <div class="text-cnt">
                            <p class="title-shp">${books.title}</p>
                            <p class="category-shp">${books.list_name}</p>
                            <p class="descr-shp">${books.description}</p>
                            <p class="author-shp">${books.author}</p>
                        <div>
                        <ul class="list-lnk">
                            <li><a class="link" href="${books.amazon_product_url}" target="_blank"><img class="icon-link" srcset="./img/amazon.png 1x, ./img/amazon.@2x.png 2x"/></a></li>
                            <li><a class="link" href="${books.buy_links[1].url}" target="_blank"><img class="icon-link" srcset="./img/apple.png 1x, ./img/apple@2x.png 2x"/></a></li>
                        </ul>
                    </li>`
    listShop.insertAdjacentHTML("beforeend", strRender);
    /*remove*/ 
    const butRemoves = document.querySelectorAll(".circle-remove");

    butRemoves.forEach(butRemove => {
        butRemove.addEventListener("click", (e) => {

            arrayBook = arrayBook.filter(element => element !== e.target.dataset.rem);
            localStorage.setItem("id", JSON.stringify(arrayBook));
            e.target.closest("li").remove();
        });
    });
     /*remove*/ 
}

for (let book in arrayBook) {
    axios.get(`https://books-backend.p.goit.global/books/${arrayBook[book]}`)
    .then(resolve => {
        // if(arrayBook.length === 0) {
        //     throw new Error (`This page is empty, add some books and proceed to order.`)
        // }
        renderShop(resolve.data);
    })
    .catch(error => console.log(error.message))
}

