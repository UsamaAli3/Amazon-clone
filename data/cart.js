export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function updateQuentity(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  const quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeItem(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingProduct = cartItem;
    }
  });
  matchingProduct.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

/*export async function loadCartFetch(fun) {
  const data = await fetch("https://supersimplebackend.dev/cart");
  console.log(data);
  fun();
}*/

export function loadCartFetch(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
// export function loadCartFetch(fun) {
//   fetch("https://supersimplebackend.dev/cart").then((r) => {
//     console.log(r);
//   });
// }
