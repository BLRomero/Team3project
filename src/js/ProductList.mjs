import {
  renderListWithTemplate
} from "./utils.mjs";

function productCardTemplate(product) {
  let discount = (((product.FinalPrice - product.SuggestedRetailPrice) / product.SuggestedRetailPrice) * 100) * (-1)
  let newDiscount = Math.round(discount)

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

    // once the HTML is rendered we can add a listener to buttons
    document
    .querySelector(".sortByName")
    .addEventListener("click", this.sortByName.bind(this, list));
    document
    .querySelector(".sortByPrice")
    .addEventListener("click", this.sortByPrice.bind(this, list));

    document.querySelector(".title").innerHTML = this.category;
    
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortByName(list) {
    console.log(list);
    function compareName(a, b) {
      const nameA = a.Name.toUpperCase();
      const nameB = b.Name.toUpperCase();
    
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    
    list.sort(compareName);
    var clear = true;
    var position = "afterbegin";
    renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
  }

  // Sort items by Price ascending
  sortByPrice(list) {
    function comparePrice(a, b) {
      const priceA = a.FinalPrice;
      const priceB = b.FinalPrice;
    
      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    }
    
    list.sort(comparePrice);
    var clear = true;
    var position = "afterbegin";
    renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
  }
}