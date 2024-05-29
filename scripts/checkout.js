import { renderOrderSummery } from "../scripts/checkout/ordersummery.js";
import { renderPaymentSummery } from "../scripts/checkout/paymentsummery.js";
//import"../data/cart-class.js"
import { loadProductsFetch } from "../data/products.js";




loadProductsFetch(()=>{
	renderOrderSummery();
renderPaymentSummery();
})

