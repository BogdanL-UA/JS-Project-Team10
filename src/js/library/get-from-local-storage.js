const getFromLocalStorage = key =>
    JSON.parse(localStorage.getItem(`${key}Movies`));
  
export { getFromLocalStorage };