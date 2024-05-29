import { renderOrderSummery } from "../scripts/checkout/ordersummery.js";
import { renderPaymentSummery } from "../scripts/checkout/paymentsummery.js";
//import"../data/cart-class.js"
import { loadProducts } from "../data/products.js";
loadProducts(()=>{
	renderOrderSummery();
renderPaymentSummery();
})

