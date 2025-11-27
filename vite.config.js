import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        shop: path.resolve(__dirname, 'shop.html'),
        product: path.resolve(__dirname, 'product.html'),
        cart: path.resolve(__dirname, 'cart.html'),
        checkout: path.resolve(__dirname, 'checkout.html'),
        confirmation: path.resolve(__dirname, 'order-confirmation.html'),
        login: path.resolve(__dirname, 'login.html'),
        register: path.resolve(__dirname, 'register.html'),
        account: path.resolve(__dirname, 'account.html'),
        about: path.resolve(__dirname, 'about.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        adminDashboard: path.resolve(__dirname, 'admin-dashboard.html'),
        adminProducts: path.resolve(__dirname, 'admin-products.html'),
        adminLogin: path.resolve(__dirname, 'admin-login.html'),
        adminOrders: path.resolve(__dirname, 'admin-orders.html'),
        adminCategories: path.resolve(__dirname, 'admin-categories.html')

      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});