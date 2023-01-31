import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discount = (((product.FinalPrice - product.SuggestedRetailPrice) / product.SuggestedRetailPrice) * 100) * (-1)
  let newDiscount = Math.round(discount)
  //console.log(newDiscount)

    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="Image of ${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">
        ${product.NameWithoutBrand}
        </h2>
        <p class="product-card_MSR_price">Originally, $${product.SuggestedRetailPrice}.00</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card_discount_price">${newDiscount}% OFF</p></a>
        <button class="card__productModalbtn">Quick View</button>
        <div value="${product.Id}" id="productModalId${product.Id}" class="modal">Hello</div>
      </li>`;
  }


  // remove tents we don't need
function removeUnneededProducts(array, index) {
  if (index > -1) { // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
  return array;
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
      const list = await this.dataSource.getData();

      // remove the two tents we don't need
      const index1 = list.map(e => e.Id).indexOf('989CG');
      removeUnneededProducts(list, index1);
      const index2 = list.map(e => e.Id).indexOf('880RT');
      removeUnneededProducts(list, index2);
      
      // render the list 
      this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
      }
}

