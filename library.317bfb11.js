function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},t={},n=r.parcelRequire276a;null==n&&((n=function(e){if(e in a)return a[e].exports;if(e in t){var r=t[e];delete t[e];var n={id:e,exports:{}};return a[e]=n,r.call(n.exports,n,n.exports),n.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,r){t[e]=r},r.parcelRequire276a=n),n("lDsUW"),n("2nhTy"),n("f3vjt");var s=n("7me8F"),i=n("krGWQ"),l=n("lDsUW"),d=n("ilvA4"),c=n("fb9GJ");const o=({id:e,poster_path:r,title:a,genres:t,release_date:n,vote_average:s})=>{document.addEventListener("click",l.default),i.refs.closeModalIcon.addEventListener("click",d.default);const c=(e=>e.length<=2?e.map((e=>e.name)).join(", "):0===e.length?"no genres":e.length>2?e.map((e=>e.name)).slice(0,2).join(", ")+", Other":void 0)(t);return`\n    <li class="library__item" data-id="${e}">\n            <div class="library__poster">\n                <img src="https://image.tmdb.org/t/p/w500${r}" alt="${a}" class="library__image" loading="lazy" data-target="card"/>\n            </div>\n            <div class="library__meta">\n                <p class="library__title" data-target="card">${a}</p>\n                <p class="library__info" data-target="card">\n                    <span class="library__genre">${c}</span> |\n                    <span class="library__year">${n.slice(0,4)}</span>\n                    <span class="library__rate">${String(s).slice(0,3)}</span></p>\n            </div>\n        </li>\n    `},f=new(0,s.FilmsApiService);function g(e){for(let r=0;r<e.length;r+=1)f.getFilmsById(e[r]).then((e=>{i.refs.library.insertAdjacentHTML("beforeend",o(e)),p()}))}async function p(){const r={totalItems:f.totalPages,itemsPerPage:3,visiblePages:5,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child"},a=new(e(c))(i.refs.pagination,r);await a.on("beforeMove",(function(e){i.refs.library.innerHTML=""})),await a.on("afterMove",(function(e){f.page=e.page,f.getFilmsById().then((e=>{f.page=1,i.refs.library.innerHTML=o(e.results)}))}))}i=n("krGWQ"),i=n("krGWQ");const u=()=>{i.refs.headerWatchedBtn.classList.add("library-header__btn--active")},y=()=>{i.refs.headerQueueBtn.classList.add("library-header__btn--active")};i=n("krGWQ");const h=()=>{i.refs.library.innerHTML=""},m=e=>JSON.parse(localStorage.getItem(`${e}Movies`)),_=()=>{let e=null;try{e=m("watched")}catch{return}return e},b=()=>{let e=null;try{e=m("queue")}catch{return}return e},v='<image class="message__image" src="https://thumbs.gfycat.com/AccurateUnfinishedBergerpicard-size_restricted.gif"/>';let L=_(),M=b();null!=L&&0!==L.length||null!=M&&0!==M.length?L.length>0?(u(),g(L)):M.length>0&&(y(),g(M)):(i.refs.message.innerHTML=`<p class="message__text">Your library is empty</p>${v}`,i.refs.library.innerHTML="",i.refs.pagination.style.display="none");i.refs.headerWatchedBtn.addEventListener("click",(e=>{i.refs.headerQueueBtn.classList.remove("library-header__btn--active"),u(),h(),L=_(),null==L||0===L.length?(i.refs.message.innerHTML=`<p class="message__text">Your list of watched films is empty</p>${v}`,i.refs.library.innerHTML="",i.refs.pagination.style.display="none"):L.length>0&&(i.refs.message.innerHTML="",i.refs.pagination.style.display="flex",g(L))})),i.refs.headerQueueBtn.addEventListener("click",(e=>{y(),i.refs.headerWatchedBtn.classList.remove("library-header__btn--active"),h(),M=b(),null==M||0===M.length?(i.refs.message.innerHTML=`<p class="message__text">Your queue is empty</p>${v}`,i.refs.library.innerHTML="",i.refs.pagination.style.display="none"):M.length>0&&(i.refs.message.innerHTML="",i.refs.pagination.style.display="flex",g(M))})),n("baGT8"),n("ghT7p"),n("6mLAN");
//# sourceMappingURL=library.317bfb11.js.map
