fetch("".concat("https://api.themoviedb.org/3","/trending/movie/week?api_key=").concat("78817c69ceeb2b190f57a1a13eaf9936")).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return console.log(e.results),e.results}));
//# sourceMappingURL=index.873ca4c9.js.map
