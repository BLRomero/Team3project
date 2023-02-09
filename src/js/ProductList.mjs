import {
  renderListWithTemplate
} from "./utils.mjs";

function productCardTemplate(product) {
  let discount = (((product.FinalPrice - product.SuggestedRetailPrice) / product.SuggestedRetailPrice) * 100) * (-1)
  let newDiscount = Math.round(discount)
  //console.log(newDiscount)

  return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          alt="Image of ${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">
        ${product.NameWithoutBrand}
        </h2>
        <p class="product-card_MSR_price">Originally, $${product.SuggestedRetailPrice}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card_discount_price1">${newDiscount}% OFF</p></a>
        <button class="card__productModalbtn" value="${product.Id}">Quick View</button>
      </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);

    // render the list 
    this.renderList(list);

    document.querySelector(".title").innerHTML = this.category;
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
