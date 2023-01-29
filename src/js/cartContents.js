import { getLocalStorage } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");

function calcNumCartItems(cartItemsVar) {
  // calcuates number of items in cartlet
  let numberInCart = 0;

  if (cartItemsVar !== null) {
    for (let i = 0; i < cartItemsVar.length; i++) {
      numberInCart += cartItemsVar[i]["Quantity"];
    }
    return numberInCart;
  }
}

function totalItemsInCart(items) {
  if (items >= 1) {
    let element = document.getElementById("numberOfItems");
    element.classList.add("cartItems_total");
    document.getElementById("total_items_in_cart").innerHTML = items;
  }
}

let cartTotal = calcNumCartItems(cartItems);

totalItemsInCart(cartTotal);
