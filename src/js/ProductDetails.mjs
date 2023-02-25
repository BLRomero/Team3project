import { calcNumCartItems } from "./cartContents.js";
import { alertMessage, setLocalStorage, myHeader } from "./utils.mjs";

export function productDetailsTemplate(product) {
  let discount =
    ((product.FinalPrice - product.SuggestedRetailPrice) /
      product.SuggestedRetailPrice) *
    100 *
    -1;
  let newDiscount = Math.round(discount);

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card_discount_price">${newDiscount}% OFF</p></a>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(
    productId,
    dataSource,
    element = "main",
    position = "afterBegin"
  ) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.element = element;
    this.position = position;
  }

  async init() {
    // use our datasource to get the details for the current product.
    this.product = await this.dataSource.findProductById(this.productId);

    // once we have the product details we can render out the HTML
    this.renderProductDetails(this.element);
    // once the HTML is rendered we can add a listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage("so-cart", this.product);
    this.ratestar();
    calcNumCartItems();
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      this.position,
      productDetailsTemplate(this.product)
    );
  }
  ratestar() {
    var a;
    a = myHeader();
    a.style.backgroundColor = "white";
    setTimeout(function () {
      a.style.backgroundColor = "green";
    }, 1000);
    setTimeout(function () {
      a.style.backgroundColor = "white";
    }, 2000);
    // setInterval(this.ratestar, 3000);
  }
}
