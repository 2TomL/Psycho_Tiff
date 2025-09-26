// Card-element hover fallback voor touch
document.querySelectorAll('.card-element').forEach(function (el) {
  el.addEventListener('mouseleave', function () {
    el.classList.remove('hover');
  });
});
// Smooth scroll met offset
function smoothScrollToSection(link, closeMenu = false) {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (closeMenu) {
        const menuWrapper = document.querySelector('.menu-wrapper');
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuWrapper && menuToggle) {
          menuWrapper.classList.remove('open');
          menuToggle.classList.remove('open');
        }
      }
    }
  });
}
document.querySelectorAll('.menu-links a').forEach(function(link) {
  smoothScrollToSection(link, true);
});
var logoLink = document.querySelector('.logo-link');
if (logoLink) {
  smoothScrollToSection(logoLink, false);
}
// zijbalk en menu
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuLinks = document.querySelectorAll('.menu-links a');
  const menuLabel = document.querySelector('.menu-label');

  function toggleMenu() {
    const isOpen = menuWrapper.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
  }
  menuToggle.addEventListener('click', toggleMenu);
  if (menuLabel) {
    menuLabel.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  menuLinks.forEach(link => {
      link.addEventListener('click', () => {
          menuWrapper.classList.remove('open');
          menuToggle.classList.remove('open');
      });
  });

  // Sluit menu als je naast het menu klikt (desktop en mobiel)
  document.addEventListener('click', function(e) {
    if (menuWrapper.classList.contains('open')) {
      // Check of er buiten de menu-wrapper en menu-toggle wordt geklikt
      if (!menuWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
        menuWrapper.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuWrapper.classList.contains('open')) {
          menuWrapper.classList.remove('open');
          menuToggle.classList.remove('open');
      }
  });
});
