import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
   <div class = "buttonIcon">   
    <button class = removeIcon id = ${item.productId} >X</button>
    </div>
  </li>`;
  
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
      renderCartTotal();
    } else {
      // if cart is empty, display message
      document.getElementById("cart-footer").classList.remove("hide");
      document.getElementById("cart-footer").innerHTML =
        "Your cart is empty.<br>Shop <a href='/index.html'>here</a>.";
    }
  }}

  // adds commas to numbers as appropriate source: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // if there are items in the cart, total will be displayed
  function renderCartTotal() {
    const cartItems = getLocalStorage("so-cart");
  
    document.getElementById("cart-footer").classList.remove("hide");
  
    // add the total price
    let cartTotal = 0;
    // calcuates number of items in cart
    let numberInCart = 0;
    for (let i = 0; i < cartItems.length; i++) {
      cartTotal += cartItems[i]["Quantity"] * cartItems[i]["FinalPrice"];
      numberInCart += cartItems[i]["Quantity"];
    }
    cartTotal = numberWithCommas(cartTotal.toFixed(2));
  
    totalItemsInCart(numberInCart);
  
    // append price to div
    const cartTotalContent = document.createTextNode(cartTotal);
    document.getElementById("cart-footer").appendChild(cartTotalContent);
  }

  
function totalItemsInCart(items) {
    if (items >= 1) {
      let element = document.getElementById("numberOfItems");
      element.classList.add("cartItems_total");
      document.getElementById("total_items_in_cart").innerHTML = items;
    }
  }
    // remove item function to remove item
  function removeItem(productId) {
    let cartItems = getLocalStorage(this.key);
    let removeItemId = productId;
    cartItems = cartItems.filter((x) => x.id !== productId)
    console.log(cartItems)
    setLocalStorage("so-cart", cartItems);
  }
  
  // remove item event listener
  document.addEventListener("click", this.removeItem.bind(this))