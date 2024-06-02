import { orders } from "../data/order.js";
import { formatCurrency } from "../scripts/utils/formatCurrency.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

loadProductsFetch(renderordersGrid);

function renderordersGrid() {
  let orderHTML = "";

  orders.forEach((order) => {
    orderHTML += `
	<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${convertDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${orderProductsHTML()}
         </div>
        </div>
	`;

    function orderProductsHTML() {
      let productsListHTML = "";

      order.products.forEach((productDetails) => {
        const productId = productDetails.productId;
        let matchingProduct = getProduct(productId);

        productsListHTML += `<div class="product-image-container">
    <img src="${matchingProduct.image}">
  </div>

  <div class="product-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-delivery-date">
      Arriving on: ${convertDate(productDetails.estimatedDeliveryTime)}
    </div>
    <div class="product-quantity">
      Quantity: ${productDetails.quantity}
    </div>
    <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${
      matchingProduct.id
    }">
      <img class="buy-again-icon js-buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message js-buy-again-message">Buy it again</span>
    </button>
  </div>

  <div class="product-actions" data-order-id="${order.id}" data-product-id="${
          matchingProduct.id
        }">
    <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
      <button class="track-package-button button-secondary">
        Track package
      </button>
    </a>
  </div> `;
      });

      return productsListHTML;
    }
  });
  document.querySelector(".js-orders-grid").innerHTML = orderHTML;
  function convertDate(date) {
    const dateString = dayjs(date).format("MMMM D");
    return dateString;
  }
}
