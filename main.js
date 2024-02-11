(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function n(e){(e.target.classList.contains("popup__close")||e.target===e.currentTarget)&&t(e.currentTarget)}function r(e){"Escape"===e.key&&(Array.from(e.currentTarget.querySelectorAll(".popup__input")).forEach((function(e){e.value=""})),t(document.querySelector(".popup_is-opened")))}var o=document.querySelector("#card-template").content;function c(e,t,n,r,c,a){var i=c.name,u=c.link,l=o.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__delete-button"),d=l.querySelector(".card__like-button"),f=l.querySelector(".card__image"),p=l.querySelector(".card__like-counter");return l.querySelector(".card__title").textContent=i,f.src=u,f.alt=i,p.textContent=c.likes.length,c.likes.some((function(e){return a===e._id}))&&d.classList.add("card__like-button_is-active"),function(e,t,n){e!==t&&n.setAttribute("style","display: none;")}(c.owner._id,a,s),s.addEventListener("click",(function(){var t,n;t=l,n=c._id,e(n).then((function(){t.remove()})).catch((function(e){return console.log(e)}))})),d.addEventListener("click",(function(){!function(e,r,o){e.classList.contains("card__like-button_is-active")?n(o).then((function(e){r.textContent=e.likes.length})).catch((function(e){return console.log(e)})):t(o).then((function(e){r.textContent=e.likes.length})).catch((function(e){return console.log(e)})),e.classList.toggle("card__like-button_is-active")}(d,p,c._id)})),f.addEventListener("click",r),l}function a(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){i(n,e.querySelector(".".concat(n.id,"-error")),t)})),u(n,e.submit)}function i(e,t,n){e.classList.remove(n.inputErrorClass),t.classList.remove(n.errorClass),t.textContent=""}function u(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.removeAttribute("disabled"):t.setAttribute("disabled","")}var l={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-5/",headers:{authorization:"261bdfb0-22be-46fa-bb01-8106523c29a8","Content-Type":"application/json"}},s=function(){return fetch("".concat(l.baseUrl,"users/me"),{method:"GET",headers:l.headers}).then((function(e){return m(e)}))},d=function(e){return fetch("".concat(l.baseUrl,"cards/").concat(e),{method:"DELETE",headers:l.headers}).then((function(e){return m(e)}))},f=function(e){return fetch("".concat(l.baseUrl,"cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then((function(e){return m(e)}))},p=function(e){return fetch("".concat(l.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:l.headers}).then((function(e){return m(e)}))},m=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y,v=document.querySelector(".places__list"),_=document.querySelectorAll(".popup"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_edit-avatar"),E=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__image_change"),q=document.forms["edit-profile"],L=document.forms["new-place"],A=document.forms["edit-avatar"],x=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function j(t){var n=document.querySelector(".popup_type_image");n.querySelector(".popup__image").src=t.target.src,n.querySelector(".popup__caption").textContent=t.target.alt,e(n)}_.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",n)})),E.addEventListener("click",(function(){q.reset();var t=q.elements.name,n=q.elements.description;t.value=x.textContent,n.value=T.textContent,a(q,w),e(b)})),C.addEventListener("click",(function(){L.reset(),a(L,w),e(S)})),k.addEventListener("click",(function(){A.reset();var t=A.elements.link;s().then((function(e){t.value=e.avatar})).catch((function(e){console.log(e)})).finally(a(A,w)),e(g)})),Promise.all([s(),fetch("".concat(l.baseUrl,"cards"),{method:"GET",headers:l.headers}).then((function(e){return m(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];y=o._id,x.textContent=o.name,T.textContent=o.about,U.setAttribute("style","background-image: url(".concat(o.avatar,");")),a.forEach((function(e){v.append(c(d,f,p,j,e,y))}))})).catch((function(e){console.log(e)})),q.addEventListener("submit",(function(e){q.elements.submit.textContent="Сохранение...",function(e){var n,r;e.preventDefault(),(n=q.elements.name.value,r=q.elements.description.value,fetch("".concat(l.baseUrl,"users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return m(e)}))).then((function(e){x.textContent=e.name,T.textContent=e.about})).catch((function(e){console.log(e)})).finally(q.elements.submit.textContent="Сохранить"),t(b)}(e)})),L.addEventListener("submit",(function(e){L.elements.submit.textContent="Сохранение...",function(e){e.preventDefault();var n,r,o=L.elements["place-name"],a=L.elements.link;(n=o.value,r=a.value,fetch("".concat(l.baseUrl,"cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return m(e)}))).then((function(e){v.prepend(c(d,f,p,j,e,y))})).catch((function(e){console.log(e)})).finally(L.elements.submit.textContent="Сохранить"),t(S),L.reset()}(e)})),A.addEventListener("submit",(function(e){A.elements.submit.textContent="Сохранение...",function(e){var n;e.preventDefault(),(n=A.elements.link.value,fetch("".concat(l.baseUrl,"users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:n})}).then((function(e){return m(e)}))).then((function(e){U.setAttribute("style","background-image: url(".concat(e.avatar,");"))})).catch((function(e){console.log(e)})).finally(A.elements.submit.textContent="Сохранить"),t(g)}(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.submit;u(n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.validity.patternMismatch?t.setCustomValidity(t.dataset.patternMismatch):t.setCustomValidity(""),t.validity.valid?i(t,r,n):function(e,t,n,r){e.classList.add(r.inputErrorClass),t.textContent=n,t.classList.add(r.errorClass)}(t,r,t.validationMessage,n)}(e,o,t),u(n,r)}))}))}(t,e)}))}(w)})();