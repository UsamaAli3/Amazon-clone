function Cart (localStorageKey){
  const cart = {
    cartItem:undefined,
      loadFromStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(localStorageKey));
      if (!this.cartItem) {
        this.cartItem = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },
     updateQuentity(productId) {
      let matchingItem;
      this.cartItem.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItem.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveToStorage();
    },
    removeItem(productId) {
      let newCart = [];
    
      this.cartItem.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
          console.log(cartItem);
        }
        console.log(productId);
      });
      this.cartItem = newCart;
      this.saveToStorage();
    },
     calculateCartQuantity() {
       let cartQuantity = 0;
    
       this.cartItem.forEach((cartItem) => {
         cartQuantity += cartItem.quantity;
       });
    
       return cartQuantity;
     },
     updateQuantity(productId, newQuantity) {
       let matchingItem;
    
       this.cartItem.forEach((cartItem) => {
         if (productId === cartItem.productId) {
           matchingItem = cartItem;
         }
       });
    
       matchingItem.quantity = newQuantity;
     },
    
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingProduct;
      this.cartItem.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingProduct = cartItem;
        }
      });
      matchingProduct.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }
  return cart
}

const cart = Cart("cart-oop")
const businessCart = Cart("businessCart")

cart.loadFromStorage()
businessCart.loadFromStorage()

console.log(cart)
console.log(businessCart)









