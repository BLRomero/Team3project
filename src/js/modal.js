import ProductData from "./ProductData.mjs";
import { productDetailsTemplate } from "./ProductDetails.mjs";

// create instance of Product Data class
const dataSource = new ProductData("tents");

const modal = document.getElementById("modal");
const buttons = document.getElementsByClassName("card__productModalbtn");
const closeX = document.getElementsByClassName("close")[0];

// wrap in window onload to remove error
window.onload = function () {
  
  // opens the modal window
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

// close modal if click on "x"
closeX.onclick = function() {
  removeModalDetails();
}

// close modal if click outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    removeModalDetails();
  }
}

class ProductModal {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        }

    async init() {
      // use our datasource to get the details for the current product.
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductModal("modal-content");
        }

    renderProductModal(selector) {
        const element = document.getElementsByClassName(selector)[0];
        element.insertAdjacentHTML(
          "beforeEnd",
          productDetailsTemplate(this.product)
        );
      }
}

// remove modal details for clean slate each click
function removeModalDetails() {
  modal.style.display = "none";
  const element = document.getElementsByClassName("product-detail")[0];
  element.remove();
}
