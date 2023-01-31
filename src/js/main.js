import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

// remove from cart variables
const removeIcons = document.getElementsByClassName("removeIcon");
const cartrows = document.getElementsByClassName("cartrows");

listing.init();


// remove from cart Eventlisteners 
for(let icon of removeIcons){
    let index = 0;
    icon.addEventListener("click"), (e)=> {
        e.preventDefault();
        cartrows[index].innerHTML = ""; 
        removeIcons[index].setAttribute("hidden", "hidden");
        index = index += 1;
  }
}
