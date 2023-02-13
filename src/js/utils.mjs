import { calcNumCartItems } from "./cartContents";

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
export function setLocalStorage(key, data, subtract = false) {

  // check if there is anything in local storage. If not,
  // create an empty array and add item. Otherwise, parse and add
  const cartItems = (() => {
    const itemData = localStorage.getItem(key);
    return itemData === null ? []
    : JSON.parse(itemData);
  })();

  if (!subtract) {
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
} else if (subtract) {
  // check if item is already in cart
  if (cartItems.some(e => e.Id === data.Id)) {
    // if it is in cart, decrease quantity by 1
    data = cartItems.find(e => e.Id === data.Id);
    data.Quantity += -1;
  }
}

  // save to local storage
    localStorage.setItem(key, JSON.stringify(cartItems));
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  // added returning the product
  return product;
}


// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// WEEK 05 TEAM4

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {

  let headerTemplate = await loadTemplate("../partials/header.html");
  let footerTemplate = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  calcNumCartItems();
}