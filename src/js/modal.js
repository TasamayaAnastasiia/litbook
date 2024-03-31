const boxModal = document.querySelector(".content-box-for-modal");
const modal = document.querySelector(".box-modal-window");
const amountBook = document.querySelector(".circle-amount");
amountBook.textContent = JSON.parse(localStorage.getItem("id")).length;
let sum = Number(amountBook.textContent);
let idArray = JSON.parse(localStorage.getItem("id")) || [];

export async function renderModal(book) {
    let str = ``;
    str += `
        <svg class="close" width="18" height="18">
            <use href="../img/sprite.svg#close-icon"></use>
        </svg>

        <div class="thumb-mdl-inf">
            <img class="image-modal" src="${book.book_image}" alt=""/>
            <div class="text-inf">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="description">${book.description}</p>
                <ul class="list-links">
                    <li><a href="${book.amazon_product_url}" target="_blank"><img class="icon-link" srcset="../img/amazon.png 1x, ../img/amazon.@2x.png 2x"/></a></li>
                    <li><a href="${book.buy_links[1].url}" target="_blank"><img class="icon-link" srcset="../img/apple.png 1x, ../img/apple@2x.png 2x"/></a></li>
                </ul>
            </div>
        </div>
        
        <button class="button-for-shop" data-id="${book._id}" type="button">${idArray.includes(book._id) ? "remove from the shopping list" : "add to shopping list"}</button>
        <div class="box-congrat"></div>`;

    boxModal.innerHTML = str;

    const buttonShop = document.querySelector(".button-for-shop");

    buttonShop.addEventListener("click", (e) => {

        if (buttonShop.textContent === "add to shopping list") {
            idArray.push(buttonShop.dataset.id);
            localStorage.setItem("id", JSON.stringify(idArray));
            sum += 1;
            amountBook.textContent = `${sum}`;
            buttonShop.textContent = "remove from the shopping list";
        } 
        else if (buttonShop.textContent === "remove from the shopping list") {

                if (idArray.includes(book._id)) {
                    idArray = idArray.filter(element => element !== book._id);
                    localStorage.setItem("id", JSON.stringify(idArray));
                    sum -= 1;
                    amountBook.textContent = `${sum}`;
                    buttonShop.textContent = "add to shopping list";
                } 
                else {
                    console.log("error");
                }
            }
        })

    const closeIcon = document.querySelector(".close");

    closeIcon.addEventListener("click", (e) => {
        modal.style.display = "none";
    });
}
