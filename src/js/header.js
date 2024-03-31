const circleForTheme = document.querySelector(".circle");
const buttonToHome = document.querySelector(".home");
const shopList = document.querySelector(".shop-list");
const switcher = document.querySelector(".switcher");

switcher.addEventListener("click", (e) => {
        circleForTheme.classList.toggle("action");
})
circleForTheme.addEventListener("click", (e) => {
    circleForTheme.classList.toggle("action");
})
buttonToHome.addEventListener("click", (e) => {
    buttonToHome.classList.toggle("yellow-draw");
})
shopList.addEventListener("click", (e) => {
    shopList.classList.toggle("yellow-draw");
})