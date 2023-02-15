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

export function calcCartTotal() {
    const cartItems = getLocalStorage("so-cart");
    // add the total price
    let cartTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      cartTotal += cartItems[i]["Quantity"] * cartItems[i]["FinalPrice"];
    }
    cartTotal = numberWithCommas(cartTotal.toFixed(2));
    return cartTotal;
  }

    // adds commas to numbers as appropriate source: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}