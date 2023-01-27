import { getLocalStorage } from './utils.mjs';



function renderCartContents() {
  // const cartItems = getLocalStorage('so-cart');

// I created some pseudo in lieu of cart being broken.

  let test = {
    Image: '../images/noun_Tent_2517.svg',
    Name: 'Test',
    Color:'#000000',
    Quantity: 1,
    FinalPrice: 199.99
  }

  document.querySelector('.product-list').innerHTML = cartItemTemplate(test);

  console.log(test);

  // only create a product list and total if cart isn't empty
  // if (cartItems !== null) {
  
    // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // document.querySelector('.product-list').innerHTML = htmlItems.join('');

    // get the sum of cart products
    renderCartTotal();

// } else {
//   // if cart is empty, display message
//   document.getElementById('cart-footer').classList.remove('hide');
//   document.getElementById('cart-footer').innerHTML = 'Your cart is empty.<br>Shop <a href=\'/index.html\'>here</a>.';
// }
}

function cartItemTemplate(item) {
  let number = 0;
  const newItem = `<li class="cart-card divider cartrows">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.ColorName}</p>  //item.Colors [0] .ColorName
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>  <div class= 'removeIcon' id= ${number}>X</div>`;

  return newItem;
}

// adds commas to numbers as appropriate source: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// if there are items in the cart, total will be displayed
function renderCartTotal() {
  const cartItems = getLocalStorage('so-cart');

  document.getElementById('cart-footer').classList.remove('hide');

  // add the total price
  let cartTotal = 0;
  // calcuates number of items in cart
  let numberInCart = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartTotal += cartItems[i]['Quantity'] * cartItems[i]['FinalPrice'];
    numberInCart += cartItems[i]['Quantity'];
  }
  cartTotal = numberWithCommas(cartTotal.toFixed(2));
  // console.log('Total number:', numberInCart);

  // append price to div
  const cartTotalContent = document.createTextNode(cartTotal);
  document.getElementById('cart-footer').appendChild(cartTotalContent);
}

renderCartContents();