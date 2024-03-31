import"./assets/support-ukraine-8512b267.js";import{a as d,i as g}from"./assets/vendor-3b32a5b3.js";const x=document.querySelector(".content-box-for-modal"),w=document.querySelector(".box-modal-window"),h=document.querySelector(".circle-amount");h.textContent=JSON.parse(localStorage.getItem("id")).length;let p=Number(h.textContent),c=JSON.parse(localStorage.getItem("id"))||[];async function S(e){let o="";o+=`
        <svg class="close" width="18" height="18">
            <use href="../img/sprite.svg#close-icon"></use>
        </svg>

        <div class="thumb-mdl-inf">
            <img class="image-modal" src="${e.book_image}" alt=""/>
            <div class="text-inf">
                <p class="title">${e.title}</p>
                <p class="author">${e.author}</p>
                <p class="description">${e.description}</p>
                <ul class="list-links">
                    <li><a href="${e.amazon_product_url}" target="_blank"><img class="icon-link" srcset="../img/amazon.png 1x, ../img/amazon.@2x.png 2x"/></a></li>
                    <li><a href="${e.buy_links[1].url}" target="_blank"><img class="icon-link" srcset="../img/apple.png 1x, ../img/apple@2x.png 2x"/></a></li>
                </ul>
            </div>
        </div>
        
        <button class="button-for-shop" data-id="${e._id}" type="button">${c.includes(e._id)?"remove from the shopping list":"add to shopping list"}</button>
        <div class="box-congrat"></div>`,x.innerHTML=o;const t=document.querySelector(".button-for-shop");t.addEventListener("click",a=>{t.textContent==="add to shopping list"?(c.push(t.dataset.id),localStorage.setItem("id",JSON.stringify(c)),p+=1,h.textContent=`${p}`,t.textContent="remove from the shopping list"):t.textContent==="remove from the shopping list"&&(c.includes(e._id)?(c=c.filter(n=>n!==e._id),localStorage.setItem("id",JSON.stringify(c)),p-=1,h.textContent=`${p}`,t.textContent="add to shopping list"):console.log("error"))}),document.querySelector(".close").addEventListener("click",a=>{w.style.display="none"})}const l=document.querySelector(".list-one"),y=document.querySelector(".list_categories"),r=document.querySelector(".main-title"),u=document.querySelector(".container-loader"),$=document.querySelector(".box-modal-window");let m;function _(){let e=window.innerWidth;return e<=767?0:e<=1439?2:4}function k(){const e=r.textContent.split(" "),o=e[e.length-1];r.innerHTML=r.innerHTML.replace(o,`<span class="blue">${o}</span>`)}async function f(){const e=document.querySelector(".image_book");document.querySelectorAll(".img-example");const o=document.querySelector(".book"),t=document.querySelectorAll(".animation-paragraf");(l.contains(e)||l.contains(o))&&t.forEach(s=>s.addEventListener("click",async a=>{$.style.display="block";const n=a.target.dataset.category;await d.get(`https://books-backend.p.goit.global/books/${n}`).then(i=>S(i.data)).catch(i=>i.message)}))}async function v(e){let o="";const t=_();for(let s in e){o+=`
            <li class="books_list">
                <h2 class="name_category">${e[s].list_name}</h2>
                <ul class="images_books">`;for(let a in e[s].books)if(o+=`<li class="image_book" data-category="${e[s].books[a]._id}">
                                    <div class="div-animation">
                                            <img class="img-example" alt="Book title" src="${e[s].books[a].book_image}"></img>
                                        <div class="box-quick-view"><p class="animation-paragraf" data-category="${e[s].books[a]._id}">Quick view</p></div>
                                    </div>
                                
                                <div class="box-cards">
                                    <p class="title-book">${e[s].books[a].title}</p>
                                    <p class="author-book">${e[s].books[a].author}</p>
                                    <div class="rating">
                                      <svg class="icon-star" width="16" height="16"><use href="../img/sprite.svg#star"></use></svg>
                                      <span class="rating-number">${e[s].books[a].rank_last_week}</span>
                                    </div>
                                </div>
                            </li>`,t==a)break;o+=`</ul><button class="button-see-more" data-category="${e[s].list_name}">See more</button></li>`}l.insertAdjacentHTML("beforeend",o),u.style.display="none",f()}l.addEventListener("click",async e=>{if(e.target.classList.contains("button-see-more")){u.style.display="block",l.innerHTML="";const o=e.target.dataset.category;r.textContent=o,y.querySelector(".categoria")&&y.querySelectorAll(".categoria").forEach(n=>{r.textContent===n.textContent&&(document.querySelector(".selected-categories").classList.remove("selected-categories"),n.classList.add("selected-categories"))});const t=r.textContent.split(" "),s=t[t.length-1];r.innerHTML=r.innerHTML.replace(s,`<span class="blue">${s}</span>`),await d.get(`https://books-backend.p.goit.global/books/category?category=${o}`).then(a=>{if(a.data.length===0)throw new Error("Sorry, books in the selected category were not found");b(a.data)}).catch(a=>g.error({title:"Error",message:a.message}))}});async function C(){l.innerHTML="",u.style.display="block",r.textContent==="Best Sellers Books"?await d.get("https://books-backend.p.goit.global/books/top-books").then(e=>{if(e.data.length===0)throw new Error("Sorry, books in the selected category were not found");v(e.data)}).catch(e=>g.error({title:"Error",message:e.message})):await d.get(`https://books-backend.p.goit.global/books/category?category=${m}`).then(e=>{if(e.data.length===0)throw new Error("Sorry, books in the selected category were not found");b(e.data)}).catch(e=>g.error({title:"Error",message:e.message}))}C();async function L(e){let o="";const t='<li tabindex="0" data-name="Best Sellers Books" class="categoria selected-categories">All categories</li>';e.forEach(a=>{o+=`<li tabindex="0" data-name="${a.list_name}" class="categoria">${a.list_name}</li>`}),y.insertAdjacentHTML("beforeend",o),y.insertAdjacentHTML("afterbegin",t),document.querySelectorAll(".categoria").forEach(a=>{a.addEventListener("click",async n=>{u.style.display="block",l.innerHTML="",n.preventDefault(),document.querySelector(".selected-categories").classList.remove("selected-categories"),n.target.classList.add("selected-categories"),m=n.target.textContent,m=m.replace(/ /g,"%20"),n.target.textContent!=="All categories"?(r.textContent=n.target.textContent,k(),await d.get(`https://books-backend.p.goit.global/books/category?category=${m}`).then(i=>{if(i.data.length===0)throw new Error("Sorry, books in the selected category were not found");b(i.data)}).catch(i=>g.error({title:"Error",message:i.message}))):(r.textContent="Best Sellers Books",k(),await d.get("https://books-backend.p.goit.global/books/top-books").then(i=>{if(i.data.length===0)throw new Error("Sorry, books in the selected category were not found");v(i.data)}).catch(i=>g.error({title:"Error",message:i.message})))})})}d.get("https://books-backend.p.goit.global/books/category-list").then(e=>{L(e.data)}).catch(e=>g.error({title:"Error",message:e.message}));async function b(e){let o="";e.forEach(async t=>{o+=`<li class="book" data-category="${t._id}">
                        <div class="div-animation">
                        <img data-category="${t._id}" class="img-example" alt="Book title" src="${t.book_image}"></img>
                            <div class="box-quick-view"><p data-category="${t._id}" class="animation-paragraf">Quick view</p></div>
                        </div>
                                <div class="box-cards">
                                    <p class="title-book">${t.title}</p>
                                    <p class="author-book">${t.author}</p>
                                    <div class="rating">
                                      <svg class="icon-star" width="16" height="16"><use href="../img/sprite.svg#star"></use></svg>
                                      <span class="rating-number">${t.rank_last_week}</span>
                                    </div>
                                </div>
                      </li>`}),l.insertAdjacentHTML("beforeend",o),u.style.display="none",f()}
//# sourceMappingURL=commonHelpers.js.map
