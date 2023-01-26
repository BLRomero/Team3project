import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

// get the product Id
const productId = getParam('product');
// create instance of Product Data class
const dataSource = new ProductData("tents");

// uses above
const product = new ProductDetails(productId, dataSource);
product.init();