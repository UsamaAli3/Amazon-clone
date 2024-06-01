import { renderOrderSummery } from "../scripts/checkout/ordersummery.js";
import { renderPaymentSummery } from "../scripts/checkout/paymentsummery.js";
//import"../data/cart-class.js"
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
  await new Promise((resolve) => {
    loadProductsFetch(() => {
      resolve();
    });
  });

  await new Promise((resolve) => {
    loadCartFetch(() => {
      resolve();
    });
  });
  renderOrderSummery();
  renderPaymentSummery();
}

loadPage();
// Promise.all([
//   new Promise((resolve) => {
//     loadProductsFetch(() => {
//       resolve("hello world");
//     });
//   }),
//   new Promise((resolve) => {
//     loadCartFetch(() => {
//       resolve();
//     });
//   }),
// ]).then((val) => {
//   console.log(val);
//   renderOrderSummery();
//   renderPaymentSummery();
// });
/*
new Promise((resolve) => {
  loadProductsFetch(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCartFetch(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummery();
    renderPaymentSummery();
  });*/
/*
loadProductsFetch(() => {
  loadCartFetch(() => {
    renderOrderSummery();
    renderPaymentSummery();
  });
});
async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCartFetch(() => {
        // reject('error3');
        resolve("value3");
      });
    });
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
  }

  renderOrderSummery();
  renderPaymentSummery();
}
loadPage();
*/
