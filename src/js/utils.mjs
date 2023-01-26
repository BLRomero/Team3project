// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {

  // check if there is anything in local storage. If not,
  // create an empty array and add item. Otherwise, parse and add
  const cartItems = (() => {
    const itemData = localStorage.getItem(key);
    return itemData === null ? []
    : JSON.parse(itemData);
  })();

  // check if item is already in cart
  if (cartItems.some(e => e.Id === data.Id)) {
    // if it is in cart, increase quantity by 1
    data = cartItems.find(e => e.Id === data.Id);
    data.Quantity += 1;
  } else {
    // if its not already in cart, give it quantity 1 and add to cart
    data.Quantity = 1;
    cartItems.push(data);
  }

  // save to local storage
    localStorage.setItem(key, JSON.stringify(cartItems));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  console.log(queryString);
  // added returning the product
  return product;
}