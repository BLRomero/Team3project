import { getLocalStorage } from "./utils.mjs";
import { calcCartTotal } from "./cartContents.js";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  /*
<img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
  */
  
    return newItem;
  }

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    // only create a product list and total if cart isn't empty
    if (cartItems !== null) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  
      // get the sum of cart products
      let cartTotal = calcCartTotal();
      renderCartTotal(cartTotal);
    } else {
      // if cart is empty, display message
      document.getElementById("cart-footer").classList.remove("hide");
      document.getElementById("cart-footer").innerHTML =
        "Your cart is empty.<br>Shop <a href='/index.html'>here</a>.";
    }
  }}

  // if there are items in the cart, total will be displayed
  function renderCartTotal(cartTotal) {
    document.getElementById("cart-footer").classList.remove("hide");
    // append price to div
    const cartTotalContent = document.createTextNode(cartTotal);
    document.getElementById("cart-footer").appendChild(cartTotalContent);
  }