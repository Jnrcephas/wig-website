import { store } from '../main.js';
import { logout } from '../store/slices/userSlice.js';

export function initializeHeader() {
  const state = store.getState();
  const isAuthenticated = state.user.isAuthenticated;
  const user = state.user.currentUser;

  // Check if nav-right exists (not on all pages)
  const navRight = document.querySelector('.nav-right');
  if (!navRight) {
    console.log('No nav-right element found on this page');
    return;
  }

  // Create user menu if authenticated
  if (isAuthenticated && user) {
    // Find or create user menu container
    let userMenu = document.getElementById('userMenu');
    if (!userMenu) {
      userMenu = document.createElement('div');
      userMenu.id = 'userMenu';
      userMenu.style.cssText = 'position:relative;margin-left:12px';
      
      // Insert before cart icon
      const cartIcon = document.getElementById('cartIcon');
      if (cartIcon) {
        navRight.insertBefore(userMenu, cartIcon);
      } else {
        navRight.appendChild(userMenu);
      }
    }

    userMenu.innerHTML = `
      <button class="icon-btn" id="userMenuBtn" aria-label="User menu" style="position:relative">
        👤
      </button>
      <div id="userDropdown" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:#fff;border:1px solid #e0e0e0;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);min-width:200px;z-index:100">
        <div style="padding:12px 16px;border-bottom:1px solid #e0e0e0">
          <div style="font-weight:600;color:#111">${user.firstName} ${user.lastName}</div>
          <div style="font-size:13px;color:#666;margin-top:2px">${user.email}</div>
        </div>
        <a href="account.html" style="display:block;padding:12px 16px;color:#111;transition:background .2s" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='transparent'">
          My Account
        </a>
        <a href="account.html#orders" style="display:block;padding:12px 16px;color:#111;transition:background .2s" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='transparent'">
          My Orders
        </a>
        <div style="border-top:1px solid #e0e0e0;padding:12px 16px">
          <button id="logoutBtnHeader" style="width:100%;padding:8px;background:#f5f5f5;border:none;border-radius:6px;font-weight:600;cursor:pointer;transition:background .2s" onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
            Logout
          </button>
        </div>
      </div>
    `;

    // Toggle dropdown
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuBtn && userDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
          userDropdown.style.display = 'none';
        }
      });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtnHeader');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
          store.dispatch(logout());
          window.location.href = 'index.html';
        }
      });
    }
  } else {
    // Show login/register links if not authenticated
    const navLinks = document.getElementById('navLinks');
    if (navLinks && !document.getElementById('authLinks')) {
      const authLinks = document.createElement('div');
      authLinks.id = 'authLinks';
      authLinks.style.cssText = 'display:flex;gap:8px;align-items:center';
      authLinks.innerHTML = `
        <a href="login.html" style="padding:8px 16px;border-radius:6px;background:#f5f5f5;font-weight:600;transition:background .2s" onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
          Login
        </a>
        <a href="register.html" class="btn" style="padding:8px 16px">
          Sign Up
        </a>
      `;
      navLinks.appendChild(authLinks);
    }
  }

  // Update cart count
  updateCartCount();
  
  // Subscribe to cart updates
  store.subscribe(updateCartCount);
}

function updateCartCount() {
  const state = store.getState();
  const cartCount = state.cart.itemCount;
  
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
  }
}