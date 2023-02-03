import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

async function cart() {
  await loadHeaderFooter();
  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
}

cart();
