// src/components/header.js

export function createHeader() {
  return `
    <header>
      <div class="container nav" role="navigation" aria-label="Main">
        <a class="logo" href="/index.html">Natishlux</a>

        <nav class="nav-links" id="navLinks" aria-label="Top">
          <a href="/index.html">Home</a>
          <a href="/shop.html">Shop</a>
          <a href="/about.html">About</a>
          <a href="/contact.html">Contact</a>
        </nav>

        <div class="nav-right">
          <button class="icon-btn" aria-label="Search" id="openSearch">🔍</button>
          <a class="icon-btn" href="/cart.html" aria-label="Cart" id="cartIcon" style="position:relative">
            🛒
            <span class="cart-count" id="cartCount" style="display:none">0</span>
          </a>
          <button class="icon-btn menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="navLinks">
            ☰
          </button>
        </div>
      </div>
    </header>
  `;
}

export function initializeHeader() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;
  
  if (!menuToggle || !navLinks) {
    console.error('Header elements not found - DOM may not be ready');
    return;
  }
  
  // console.log('Header initialized successfully'); // Debug log
  
  // Toggle menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive);
    menuToggle.textContent = isActive ? '✕' : '☰';
    
    if (window.innerWidth <= 900) {
      body.style.overflow = isActive ? 'hidden' : '';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
      body.style.overflow = '';
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
        body.style.overflow = '';
      }
    });
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
        body.style.overflow = '';
      }
    }, 250);
  });

  // Update cart count
  updateCartCount();
}

function updateCartCount() {
  const cartCountEl = document.getElementById('cartCount');
  if (!cartCountEl) return;

  // Use absolute path
  import('/src/main.js').then(({ store }) => {
    const updateCount = () => {
      const state = store.getState();
      const totalItems = state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      
      if (totalItems > 0) {
        cartCountEl.textContent = totalItems;
        cartCountEl.style.display = 'block';
      } else {
        cartCountEl.style.display = 'none';
      }
    };

    updateCount();
    store.subscribe(updateCount);
  }).catch(err => {
    console.error('Failed to load store:', err);
  });
}