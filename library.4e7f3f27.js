function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequire276a;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},r.parcelRequire276a=a),a.register("e7uzx",(function(e,r){var t=a("8VoSq"),n=a("33qOe");const i=e=>JSON.parse(localStorage.getItem(`${e}Movies`));let l=i("watched"),s=i("queue");const o=()=>{n.refs.library.innerHTML=""},d=()=>{n.refs.headerWatchedBtn.classList.add("library-header__btn--active")};if(null!=l&&0!==l.length||null!=s&&0!==s.length){if(l.length>0)return o(),d(),void(0,t.renderLibrary)(l);if(s.length>0)return o(),n.refs.headerQueueBtn.classList.add("library-header__btn--active"),void(0,t.renderLibrary)(s)}else o(),n.refs.message.innerHTML="<p>Ви ще не додали фільми до бібліотеки</p>"})),a.register("8VoSq",(function(r,t){e(r.exports,"renderLibrary",(function(){return d}));var n=a("7me8F"),i=a("33qOe"),l=a("lDsUW");const s=({id:e,poster_path:r,title:t,genres:n,release_date:a,vote_average:i})=>{document.addEventListener("click",l.default);const s=(e=>e.length<2?e.map((e=>e.name)).join(", "):0===e.length?"no genres":e.length>2?e.map((e=>e.name)).slice(0,2).join(", ")+", Other":void 0)(n);return`\n    <li class="library__item" data-id="${e}">\n            <div class="library__poster">\n                <img src="https://image.tmdb.org/t/p/w500${r}" alt="${t}" class="library__image" data-target="card"/>\n            </div>\n            <div class="library__meta">\n                <p class="library__title" data-target="card">${t}</p>\n                <p class="library__info" data-target="card">\n                    <span class="library__genre">${s}</span> |\n                    <span class="library__year">${a.slice(0,4)}</span>\n                    <span class="library__rate">${String(i).slice(0,3)}</span></p>\n            </div>\n        </li>\n    `},o=new(0,n.FilmsApiService);function d(e){for(let r=0;r<e.length;r+=1)o.getFilmsById(e[r]).then((e=>{i.refs.library.insertAdjacentHTML("beforeend",s(e))}))}})),a.register("33qOe",(function(r,t){e(r.exports,"refs",(function(){return n}));const n={library:document.querySelector(".library__list"),message:document.querySelector(".message"),headerWatchedBtn:document.querySelector(".library-header__watched-btn"),headerQueueBtn:document.querySelector(".library-header__queue-btn")}})),a("lDsUW"),a("2nhTy"),a("e7uzx"),a("baGT8"),a("ghT7p"),a("6mLAN");
//# sourceMappingURL=library.4e7f3f27.js.map
