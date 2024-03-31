import"./assets/support-ukraine-8512b267.js";import{a as r}from"./assets/vendor-3b32a5b3.js";const a=document.querySelector(".home"),c=document.querySelector(".shop-list"),n=document.querySelector(".circle-amount"),m=document.querySelector(".shop-list-bk");document.querySelector(".bx-shp");let s=JSON.parse(localStorage.getItem("id"));a.classList.contains("yellow-draw")&&(a.classList.remove("yellow-draw"),c.classList.add("yellow-draw"));n.style.display="none";async function p(e){let t="";t+=`<li class="option-list-bk">
                    <a data-rem="${e._id}" class="circle-remove" href=""><svg data-rem="${e._id}" width="18" height="18"><use href="./img/sprite.svg#remove"></use></svg></a>
                        <img class="img-bk" alt="" src="${e.book_image}"/>
                        <div class="text-cnt">
                            <p class="title-shp">${e.title}</p>
                            <p class="category-shp">${e.list_name}</p>
                            <p class="descr-shp">${e.description}</p>
                            <p class="author-shp">${e.author}</p>
                        <div>
                        <ul class="list-lnk">
                            <li><a class="link" href="${e.amazon_product_url}" target="_blank"><img class="icon-link" srcset="./img/amazon.png 1x, ./img/amazon.@2x.png 2x"/></a></li>
                            <li><a class="link" href="${e.buy_links[1].url}" target="_blank"><img class="icon-link" srcset="./img/apple.png 1x, ./img/apple@2x.png 2x"/></a></li>
                        </ul>
                    </li>`,m.insertAdjacentHTML("beforeend",t),document.querySelectorAll(".circle-remove").forEach(i=>{i.addEventListener("click",l=>{s=s.filter(o=>o!==l.target.dataset.rem),localStorage.setItem("id",JSON.stringify(s)),l.target.closest("li").remove()})})}for(let e in s)r.get(`https://books-backend.p.goit.global/books/${s[e]}`).then(t=>{p(t.data)}).catch(t=>console.log(t.message));
//# sourceMappingURL=commonHelpers2.js.map
