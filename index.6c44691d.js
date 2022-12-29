fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=78817c69ceeb2b190f57a1a13eaf9936").then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>(console.log(e.results),e.results)));
//# sourceMappingURL=index.6c44691d.js.map
