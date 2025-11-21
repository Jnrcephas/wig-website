import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error);
  }
  return [];
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const initialState = {
  items: loadCartFromStorage(),
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      
      console.log('Adding to cart:', product.name, 'Quantity:', quantity);
      console.log('Current cart items:', state.items.length);
      
      // Find existing item by product ID
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        console.log('Item already exists, increasing quantity');
        existingItem.quantity += quantity;
      } else {
        console.log('New item, adding to cart');
        state.items.push({
          product,
          quantity,
          price: product.price
        });
      }
      
      console.log('Updated cart items:', state.items.length);
      saveCartToStorage(state.items);
    },
    
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
        saveCartToStorage(state.items);
      }
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      saveCartToStorage(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  setLoading,
  setError
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};
export const selectCartCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};

export default cartSlice.reducer;