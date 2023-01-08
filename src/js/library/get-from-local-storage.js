const getFromLocalStorage = key =>
    JSON.parse(localStorage.getItem(`${key}Movies`));

const checkWatched = () => {
    let watchedMovies = null;
    try {
        watchedMovies = getFromLocalStorage('watched');
    } catch {
        return;
    }
    return watchedMovies;
}

const checkQueue = () => {
    let queueMovies = null;
    try {
        queueMovies = getFromLocalStorage('queue');
    } catch {
        return;
    }
    return queueMovies;
}
  
export { checkWatched, checkQueue };