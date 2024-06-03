import { products, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/formatCurrency.js";
import { updateQuentity, calculateCartQuantity } from "../data/cart.js";

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  let productsHtml = "";

  products.forEach((product) => {
    productsHtml += `
		<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src=${product.getRating()}
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id=${
            product.id
          }>Add to Cart</button>
        </div>
		`;
  });

  document.querySelector(".products-grid").innerHTML = productsHtml;

  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {

      const productId = button.dataset.productId;
      updateQuentity(productId);
      calculateCartQuantity();
      renderProductsGrid();

      const addedMessageTimeouts = {};

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );

      addedMessage.classList.add("added-to-cart-visible");
      setTimeout(() => {
        // Check if there's a previous timeout for this
        // product. If there is, we should stop it.
        const previousTimeoutId = addedMessageTimeouts[productId];

        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove("added-to-cart-visible");
        }, 2000);

        // Save the timeoutId for this product
        // so we can stop it later if we need to.
        addedMessageTimeouts[productId] = timeoutId;
      });
    });
  });
}
