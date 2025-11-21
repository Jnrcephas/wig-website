import { store } from './store/index.js';

// Export store for use in HTML files
export { store };

// Initialize cart count display
function updateCartCount() {
  const state = store.getState();
  const count = state.cart.items.reduce((total, item) => total + item.quantity, 0);
  
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    if (count > 0) {
      el.textContent = count;
      el.style.display = 'inline';
    } else {
      el.style.display = 'none';
    }
  });
}

// Subscribe to cart changes
store.subscribe(updateCartCount);

// Initial update
updateCartCount();

console.log('Store initialized');