import { getLocalStorage } from "./utils.mjs";

export function calcNumCartItems() {
  const cartItems = getLocalStorage("so-cart");
  // calcuates number of items in cartlet
  let numberInCart = 0;

  if (cartItems !== null) {
    for (let i = 0; i < cartItems.length; i++) {
      numberInCart += cartItems[i]["Quantity"];
    }
    totalItemsInCart(numberInCart);
  }
}

function totalItemsInCart(items) {
  if (items >= 1) {
    let element = document.getElementById("numberOfItems");
    element.classList.add("cartItems_total");
    document.getElementById("total_items_in_cart").innerHTML = items;
  }
}
