// Add this to the bottom of the script section in each customer page
// OR create a separate file like src/utils/mobile-menu.js and import it

// Mobile menu functionality - FIXED VERSION
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;
  
  if (menuToggle && navLinks) {
    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
      
      // Prevent body scroll when menu is open
      if (isActive) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
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
          body.style.overflow = '';
        }
      }, 250);
    });
  }
});