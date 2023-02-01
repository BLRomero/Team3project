import ProductData from "./ProductData.mjs";
// create instance of Product Data class
const dataSource = new ProductData("tents");

// wrap in window onload to remove error
window.onload = function () {
  const modal = document.getElementById("modal");

  const buttons = document.getElementsByClassName("card__productModalbtn");
  
  function openModal(buttonId) {
    console.log("Id", buttonId);
    modal.style.display = "block";
    const product = new ProductModal(buttonId, dataSource);
    product.init();
  }

  // add listeners to the "Quick View" buttons
  for (var i = 0; i < buttons.length; i++) {
    let buttonId = buttons[i].value;
    buttons[i].addEventListener("click", function() {openModal(buttonId)}
    , false);
}
};

const span = document.getElementsByClassName("close")[0];

// close modal if click on "x"
span.onclick = function() {
  modal.style.display = "none";
  const listing = new ProductModal("Tents", dataSource, element);
  console.log("made it here");
  listing.init();
}

// close modal if click outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function productModalTemplate(product) {
  let discount = (((product.FinalPrice - product.SuggestedRetailPrice) / product.SuggestedRetailPrice) * 100) * (-1)
  let newDiscount = Math.round(discount)
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product-card_discount_price">${newDiscount}% OFF</p></a>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductModal {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        }

    async init() {
      // use our datasource to get the details for the current product.
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductModal("modal");
        }

    renderProductModal(selector) {
        const element = document.getElementById(selector);
        console.log(element);
        element.insertAdjacentHTML(
          "afterBegin",
          productModalTemplate(this.product)
        );
      }
}
