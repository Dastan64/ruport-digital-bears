!function(){"use strict";var t={d:function(e,n){for(var c in n)t.o(n,c)&&!t.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:n[c]})}};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),t.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var c=n.getElementsByTagName("script");c.length&&(e=c[c.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e}(),t.d({},{g:function(){return l}});const e=t.p+"assets/images/loader.svg";var n,c=document.querySelector("#cards-container"),a=document.querySelector(".popup"),r=document.querySelector(".check__input"),i=document.querySelector(".main__select"),o=document.querySelector(".main__heading"),s=[],d=[],p=function(t,e){var n=t.filter((function(t){return t.in_reserve}));"accepted"!==e?l(n):l(n,"accepted")};window.addEventListener("load",(function(){0===c.children.length&&c.insertAdjacentHTML("beforebegin",'\n        <img class="main__loader" style="display: block; margin: 20px auto;" width="200" height="200" src='.concat(e,' alt="">\n        ')),fetch("https://private-9d5e37a-testassignment.apiary-mock.com/get-bears").then((function(t){return t.json()})).then((function(t){n=t.results.data,l(n),document.querySelector(".main__loader").remove()})).catch((function(t){return console.error(t)}))}));var l=function(t,e){c.innerHTML="",t.length>0?"accepted"===e?t.forEach((function(t){var n=document.createElement("article");n.innerHTML='\n                <article class="main__card card '.concat(null!=t&&t.in_reserve?"card--highlighted":"",'" id=').concat(t.id," data-type=").concat(e,'>\n                <div class="card__image-container">\n                    <img width="220" height="146" class="card__image" src=').concat(t.image_url,' alt="">\n                </div>\n                <div class="card__content">\n                    <h3 class="card__title">').concat(t.name,'</h3>\n                    <p class="card__description">').concat(t.type,'</p>\n                    <p class="card__description">').concat(t.gender,"</p>\n                </div>\n            </article>\n                "),c.append(n)})):t.forEach((function(t){var e=document.createElement("article");e.innerHTML='\n            <article class="main__card card '.concat(null!=t&&t.in_reserve?"card--highlighted":"",'" id=').concat(t.id,'>\n            <div class="card__image-container">\n                <img width="220" height="146" class="card__image" src=').concat(t.image_url,' alt="">\n            </div>\n            <div class="card__content">\n                <h3 class="card__title">').concat(t.name,'</h3>\n                <p class="card__description">').concat(t.type,'</p>\n                <p class="card__description">').concat(t.gender,'</p>\n                <div class="card__buttons">\n                    <button class="card__btn card__btn--accept" type="button">Принять</button>\n                    <button class="card__btn card__btn--reject" type="button">Отклонить</button>\n                </div>\n            </div>\n        </article>\n            '),c.append(e)})):c.innerHTML="<h2>Медведей нет, но вы держитесь!</h2>"};r.addEventListener("change",(function(){if(r.checked)switch(i.value){case"planned-bears":default:p(n);break;case"accepted-bears":p(s,"accepted");break;case"declined-bears":p(d)}else switch(i.value){case"planned-bears":l(n);break;case"accepted-bears":l(s,"accepted");break;case"declined-bears":l(d)}})),i.addEventListener("change",(function(t){switch(t.target.value){case"planned-bears":o.textContent="Поступившие заявки",l(n);break;case"accepted-bears":o.textContent="Принятые медведи",l(s,"accepted");break;case"declined-bears":o.textContent="Отклонённые медведи",l(d)}}));var u=function(t,e,c){fetch(t,{method:"POST",body:JSON.stringify({id:e})}).then((function(t){t.ok&&(function(t,e){var c=n.find((function(e){return e.id===t}));e.push(c)}(e,c),n=n.filter((function(t){return t.id!==e})))})).catch((function(t){return console.error(t)}))};c.addEventListener("click",(function(t){if("BUTTON"===t.target.tagName&&t.target.classList.contains("card__btn--accept")&&t.target.closest(".card")){var e=+t.target.closest(".card").id;u("https://private-9d5e37a-testassignment.apiary-mock.com/resolve-bear",e,s)}else if("BUTTON"===t.target.tagName&&t.target.classList.contains("card__btn--reject")&&t.target.closest(".card")){var n=+t.target.closest(".card").id;u("https://private-9d5e37a-testassignment.apiary-mock.com/reject-bear",n,d)}else if("accepted"===t.target.closest(".card").dataset.type){var c=+t.target.closest(".card").id;fetch("https://private-dd610-ruporttestassignment.apiary-mock.com/get-bears/".concat(c)).then((function(t){if(t.ok)return t.json();404===t.status&&(alert("Судя по всему, только Леонард, Миша и Клео могут рассказать о себе. Остальные стесняются."),console.warn("Похоже, работают только 3 эндпоинта из 10"))})).then((function(t){var e=t.data;console.log(e),function(t){a.classList.toggle("popup--hidden"),a.innerHTML='\n    <div class="popup">\n    <div class="popup__content">\n        <div class="popup__image-container">\n            <img width="460" height="400" class="popup__image" src='.concat(t.image_url,' alt="">\n        </div>\n        <div class="popup__info">\n            <h3 class="popup__title">').concat(t.name,'</h3>\n            <p class="popup__description">').concat(t.type,'</p>\n            <p class="popup__description">').concat(t.gender,'</p>\n            <div class="popup__text-container">\n                <p class="popup__text">').concat(t.text,'</p>\n            </div>\n            <div class="popup__buttons">\n                <button class="popup__btn popup__btn--accept" type="button">Принять</button>\n                <button class="popup__btn popup__btn--reject" type="button">Отклонить</button>\n            </div>\n        </div>\n        <button class="popup__close-btn" type="button">\n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path d="M19 1L1 19" stroke="white" stroke-width="2" stroke-linecap="round"\n                    stroke-linejoin="round" />\n                <path d="M1 1L19 19" stroke="white" stroke-width="2" stroke-linecap="round"\n                    stroke-linejoin="round" />\n            </svg>\n        </button>\n    </div>\n</div>\n    '),a.querySelector(".popup__close-btn").addEventListener("click",(function(){a.classList.toggle("popup--hidden")}))}(e)})).catch((function(t){return console.log(t)}))}}))}();