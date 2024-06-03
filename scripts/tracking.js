import { calculateCartQuantity } from "../data/cart.js";
import { getOrder } from "../data/order.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { searchProduct } from "./search.js";

loadProductsFetch(renderTracking);

function renderTracking() {
  //get the url
  const url = new URL(window.location.href);
  //get the url parameter out
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const matchingOrder = getOrder(orderId);
  const matchingProduct = getProduct(productId);
  console.log(matchingOrder);
  let matchingOrderProduct;

  matchingOrder.products.forEach((productDetail) => {
    if (productDetail.productId === matchingProduct.id) {
      matchingOrderProduct = productDetail;
    }
    return matchingOrderProduct;
  });

  const currentTime = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingOrderProduct.estimatedDeliveryTime);
  //can also use currentTime-orderTime //.diff give in ms
  const percentProgress =
    (currentTime.diff(orderTime) / deliveryTime.diff(orderTime)) * 100;
  const deliveredMessage =
    currentTime > deliveryTime ? "Delivered on" : "Arriving on";
  searchProduct();
  calculateCartQuantity();

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      ${deliveredMessage} ${deliveryTime.format("dddd, MMMM D")}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${matchingOrderProduct.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? "current-status" : ""
      }">
        Preparing
      </div>
      <div class="progress-label ${
        percentProgress >= 50 && percentProgress < 100 ? "current-status" : ""
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ""
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}
