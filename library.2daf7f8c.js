!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},a=e.parcelRequire276a;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in t){var a=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,a.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequire276a=a),a("8Tess"),a("jcFG7");var r=a("1h2Gi"),i={library:document.querySelector(".library__list"),message:document.querySelector(".message"),headerWatchedBtn:document.querySelector(".library-header__watched-btn"),headerQueueBtn:document.querySelector(".library-header__queue-btn")},l=a("8Tess"),c=function(e){var n=e.id,t=e.poster_path,a=e.title,r=e.genres,i=e.release_date,c=e.vote_average;document.addEventListener("click",l.default);var s=function(e){return e.length<2?e.map((function(e){return e.name})).join(", "):0===e.length?"no genres":e.length>2?e.map((function(e){return e.name})).slice(0,2).join(", ")+", Other":void 0}(r);return'\n    <li class="library__item" data-id="'.concat(n,'">\n            <div class="library__poster">\n                <img src="https://image.tmdb.org/t/p/w500').concat(t,'" alt="').concat(a,'" class="library__image" data-target="card"/>\n            </div>\n            <div class="library__meta">\n                <p class="library__title" data-target="card">').concat(a,'</p>\n                <p class="library__info" data-target="card">\n                    <span class="library__genre">').concat(s,'</span> |\n                    <span class="library__year">').concat(i.slice(0,4),'</span>\n                    <span class="library__rate">').concat(String(c).slice(0,3),"</span></p>\n            </div>\n        </li>\n    ")},s=new(0,r.FilmsApiService);function o(e){for(var n=0;n<e.length;n+=1)s.getFilmsById(e[n]).then((function(e){i.library.insertAdjacentHTML("beforeend",c(e))}))}var d=function(){i.headerWatchedBtn.classList.add("library-header__btn--active")},u=function(){i.headerQueueBtn.classList.add("library-header__btn--active")},g=function(){i.library.innerHTML=""},h=function(e){return JSON.parse(localStorage.getItem("".concat(e,"Movies")))},_=h("watched"),p=h("queue");null!=_&&0!==_.length||null!=p&&0!==p.length?_.length>0?(g(),d(),o(_)):p.length>0&&(g(),u(),o(p)):(g(),i.message.innerHTML="<p>Ви ще не додали фільми до бібліотеки</p>");i.headerWatchedBtn.addEventListener("click",(function(e){console.log("Привіт від кнопки watched"),i.headerQueueBtn.classList.remove("library-header__btn--active"),d(),g(),null==_||0===_.length?i.message.innerHTML="<p>Ви ще не додали фільми до списку переглянутих</p>":_.length>0&&(i.message.innerHTML="",o(_))})),i.headerQueueBtn.addEventListener("click",(function(e){console.log("Привіт від кнопки queue"),u(),i.headerWatchedBtn.classList.remove("library-header__btn--active"),g(),null==p||0===p.length?i.message.innerHTML="<p>Ви ще не додали фільми до черги</p>":p.length>0&&(i.message.innerHTML="",o(p))})),a("ghnK3"),a("32ZrB"),a("d43SW")}();
//# sourceMappingURL=library.2daf7f8c.js.map