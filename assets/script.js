// Material Design 3 Enhanced JavaScript System
class MaterialDesign3Manager {
  constructor() {
    this.themeManager = new MaterialThemeManager();
    this.mobileMenu = new MaterialMobileMenu();
    this.scrollAnimations = new MaterialScrollAnimations();
    this.topAppBarScroll = new MaterialTopAppBarScroll();
    this.fab = new MaterialFAB();
    this.ripple = new MaterialRipple();
    this.stateLayerManager = new MaterialStateLayerManager();
    
    // Page-specific components
    if (document.getElementById('division-filter')) {
      this.tournamentFilter = new MaterialTournamentFilter();
    }
    
    if (document.querySelector('.toggle-players')) {
      this.playerListToggle = new MaterialPlayerListToggle();
    }
    
    if (document.getElementById('contact-form')) {
      this.contactForm = new MaterialContactForm();
    }
    
    if (document.querySelector('.timeline-node')) {
      this.timelineManager = new MaterialTimelineManager();
    }
    
    this.init();
  }
  
  init() {
    this.setupPerformanceMonitoring();
    this.setupErrorHandling();
    this.setupLazyLoading();
    this.announceLoad();
  }
  
  setupPerformanceMonitoring() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
        
        console.log(
          '%c🎨 Material Design 3 Website Loaded',
          'color: var(--md-sys-color-primary); font-size: 16px; font-weight: bold;'
        );
        console.log(
          `%c⚡ Load time: ${loadTime}ms`,
          'color: var(--md-sys-color-secondary); font-size: 12px;'
        );
      });
    }
  }
  
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Application Error:', e.error);
      this.showErrorNotification('Something went wrong. Please refresh the page.');
    });
  }
  
  setupLazyLoading() {
    const lazyElements = document.querySelectorAll('.md-lazy-load');
    
    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
          }
        });
      });
      
      lazyElements.forEach(el => lazyObserver.observe(el));
    } else {
      lazyElements.forEach(el => el.classList.add('loaded'));
    }
  }
  
  showErrorNotification(message) {
    const errorNotification = document.createElement('div');
    errorNotification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      padding: 16px 24px;
      border-radius: var(--md-sys-shape-corner-medium);
      font-family: var(--md-sys-typescale-body-medium-font);
      font-size: var(--md-sys-typescale-body-medium-size);
      z-index: 1080;
      box-shadow: var(--md-sys-elevation-level3);
      animation: slideInRight var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
      max-width: 300px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    errorNotification.innerHTML = `<span class="material-icons">error</span>${message}`;
    
    document.body.appendChild(errorNotification);
    
    setTimeout(() => {
      errorNotification.style.animation = 'fadeOut var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized)';
      setTimeout(() => errorNotification.remove(), 300);
    }, 5000);
  }
  
  announceLoad() {
    console.log(
      '%c🌍 Welcome to the Gambia Scrabble Federation',
      'color: var(--md-sys-color-tertiary); font-size: 14px;'
    );
  }
}

// Material Design 3 Theme Manager
class MaterialThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.md-theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    this.updateThemeIcon();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    this.updateThemeIcon();
    this.animateThemeTransition();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  updateThemeIcon() {
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('.theme-icon');
      if (this.currentTheme === 'dark') {
        icon.textContent = 'dark_mode';
        icon.setAttribute('aria-label', 'Dark mode active');
      } else {
        icon.textContent = 'light_mode';
        icon.setAttribute('aria-label', 'Light mode active');
      }
    }
  }

  animateThemeTransition() {
    document.body.style.transition = 'background-color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard), color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard)';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
}

// Material Design 3 Mobile Menu
class MaterialMobileMenu {
  constructor() {
    this.toggle = document.querySelector('.md-menu-toggle');
    this.mobileNav = document.querySelector('.md-mobile-nav');
    this.init();
  }

  init() {
    if (this.toggle && this.mobileNav) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking on links
      this.mobileNav.querySelectorAll('.md-nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.toggle.contains(e.target) && !this.mobileNav.contains(e.target)) {
          this.closeMenu();
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileNav.classList.contains('active')) {
          this.closeMenu();
          this.toggle.focus();
        }
      });
    }
  }

  toggleMenu() {
    const isOpen = this.mobileNav.classList.contains('active');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.mobileNav.classList.add('active');
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Focus first menu item for accessibility
    const firstLink = this.mobileNav.querySelector('.md-nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMenu() {
    this.mobileNav.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
  }
}

// Material Design 3 Scroll Animations with Staggered Effects
class MaterialScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      [...this.elements, ...this.timelineItems].forEach(el => {
        this.observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      [...this.elements, ...this.timelineItems].forEach(el => {
        el.classList.add('animate');
      });
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation with 150ms delay
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 150);
        
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Material Design 3 Tournament Filter with Enhanced UX
class MaterialTournamentFilter {
  constructor() {
    this.filterSelect = document.getElementById('division-filter');
    this.tournamentCards = document.querySelectorAll('.tournament-card');
    this.init();
  }

  init() {
    if (this.filterSelect) {
      this.filterSelect.addEventListener('change', (e) => this.filterTournaments(e.target.value));
    }
  }

  filterTournaments(division) {
    let visibleCount = 0;
    
    this.tournamentCards.forEach((card, index) => {
      const cardDivision = card.dataset.division;
      const shouldShow = division === 'all' || cardDivision === division;
      
      if (shouldShow) {
        card.style.display = 'block';
        card.style.animation = `fadeInUp var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized) ${visibleCount * 0.1}s both`;
        card.setAttribute('aria-hidden', 'false');
        visibleCount++;
      } else {
        card.style.animation = 'fadeOut var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard) both';
        card.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });

    // Announce filter results to screen readers
    const announcement = `Showing ${visibleCount} tournament${visibleCount !== 1 ? 's' : ''} for ${division === 'all' ? 'all divisions' : division + ' division'}`;
    this.announceToScreenReader(announcement);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Material Design 3 Player List Toggle
class MaterialPlayerListToggle {
  constructor() {
    this.toggleButtons = document.querySelectorAll('.toggle-players');
    this.init();
  }

  init() {
    this.toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => this.togglePlayerList(e.target));
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.togglePlayerList(e.target);
        }
      });
    });
  }

  togglePlayerList(button) {
    const targetId = button.dataset.target;
    const playerList = document.getElementById(targetId);
    const icon = button.querySelector('.toggle-icon');
    const isVisible = playerList.classList.contains('visible');

    if (isVisible) {
      playerList.classList.remove('visible');
      button.setAttribute('aria-expanded', 'false');
      icon.textContent = 'expand_more';
      button.innerHTML = button.innerHTML.replace('Hide Players', 'View Players');
      playerList.setAttribute('aria-hidden', 'true');
    } else {
      playerList.classList.add('visible');
      button.setAttribute('aria-expanded', 'true');
      icon.textContent = 'expand_less';
      button.innerHTML = button.innerHTML.replace('View Players', 'Hide Players');
      playerList.setAttribute('aria-hidden', 'false');
    }
  }
}

// Material Design 3 Contact Form with Enhanced Validation
class MaterialContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.successMessage = document.getElementById('success-message');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupInputEffects();
      this.setupValidation();
    }
  }

  setupInputEffects() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        e.target.style.borderColor = 'var(--md-sys-color-primary)';
        e.target.style.borderWidth = '2px';
        e.target.style.padding = '15px';
      });
      
      input.addEventListener('blur', (e) => {
        e.target.style.borderColor = 'var(--md-sys-color-outline)';
        e.target.style.borderWidth = '1px';
        e.target.style.padding = '16px';
        this.validateField(e.target);
      });
    });
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const errorElement = document.getElementById(field.id + '-error');
    if (!errorElement) return;

    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required.';
    } else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(field, message) {
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    field.style.borderColor = 'var(--md-sys-color-error)';
    field.setAttribute('aria-invalid', 'true');
  }

  clearError(field) {
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    
    field.style.borderColor = 'var(--md-sys-color-outline)';
    field.setAttribute('aria-invalid', 'false');
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Focus first invalid field
      const firstInvalid = this.form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }
    
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span class="material-icons">hourglass_empty</span> Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.showSuccess();
      this.form.reset();
      
      // Clear all error states
      inputs.forEach(input => this.clearError(input));
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError(this.form, 'Failed to send message. Please try again.');
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.style.opacity = '';
    }
  }

  showSuccess() {
    this.successMessage.classList.add('show');
    this.successMessage.focus();
    
    setTimeout(() => {
      this.successMessage.classList.remove('show');
    }, 5000);
  }
}

// Material Design 3 Top App Bar Scroll Effect
class MaterialTopAppBarScroll {
  constructor() {
    this.topAppBar = document.querySelector('.md-top-app-bar');
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    if (this.topAppBar) {
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    const scrolled = currentScrollY > 50;
    
    this.topAppBar.classList.toggle('scrolled', scrolled);
    
    // Collapsible app bar on scroll
    if (currentScrollY > 100) {
      this.topAppBar.classList.add('collapsed');
    } else {
      this.topAppBar.classList.remove('collapsed');
    }
    
    // Hide navbar when scrolling down, show when scrolling up
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.topAppBar.style.transform = 'translateY(-100%)';
    } else {
      this.topAppBar.style.transform = 'translateY(0)';
    }
    
    this.lastScrollY = currentScrollY;
  }
}

// Material Design 3 Timeline Manager
class MaterialTimelineManager {
  constructor() {
    this.timelineNodes = document.querySelectorAll('.timeline-node');
    this.init();
  }

  init() {
    this.timelineNodes.forEach((node, index) => {
      node.addEventListener('click', () => this.expandTimelineItem(node, index));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.expandTimelineItem(node, index);
        }
      });
      node.addEventListener('mouseenter', () => this.highlightNode(node));
      node.addEventListener('mouseleave', () => this.unhighlightNode(node));
      node.addEventListener('focus', () => this.highlightNode(node));
      node.addEventListener('blur', () => this.unhighlightNode(node));
    });
  }

  expandTimelineItem(node, index) {
    const content = node.parentElement.querySelector('.timeline-content');
    const isExpanded = content.classList.contains('expanded');
    
    // Close all other expanded items
    document.querySelectorAll('.timeline-content.expanded').forEach(item => {
      item.classList.remove('expanded');
      item.style.maxHeight = '';
    });
    
    if (!isExpanded) {
      content.classList.add('expanded');
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.animation = 'expandContent var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized)';
    }
  }

  highlightNode(node) {
    node.style.transform = 'translateX(-50%) scale(1.2)';
    node.style.backgroundColor = 'var(--md-sys-color-primary-container)';
  }

  unhighlightNode(node) {
    node.style.transform = 'translateX(-50%) scale(1)';
    node.style.backgroundColor = 'var(--md-sys-color-primary)';
  }
}

// Material Design 3 FAB (Back to Top)
class MaterialFAB {
  constructor() {
    this.fab = document.getElementById('back-to-top');
    this.init();
  }

  init() {
    if (this.fab) {
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
      this.fab.addEventListener('click', () => this.scrollToTop());
    }
  }

  handleScroll() {
    const scrolled = window.scrollY > 300;
    
    if (scrolled) {
      this.fab.classList.add('visible');
    } else {
      this.fab.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add ripple effect
    this.fab.style.animation = 'pulse var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard)';
    setTimeout(() => {
      this.fab.style.animation = '';
    }, 200);
  }
}

// Material Design 3 Ripple Effect
class MaterialRipple {
  constructor() {
    this.init();
  }

  init() {
    // Add ripple effect to buttons and clickable elements
    const rippleElements = document.querySelectorAll('.md-button, .md-nav-link, .md-card, .md-fab');
    
    rippleElements.forEach(element => {
      element.addEventListener('click', (e) => this.createRipple(e));
    });
  }

  createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    // Remove ripple after animation (180ms)
    setTimeout(() => {
      circle.remove();
    }, 180);
  }
}

// Material Design 3 State Layer Manager
class MaterialStateLayerManager {
  constructor() {
    this.init();
  }

  init() {
    // Add state layers to interactive elements
    const interactiveElements = document.querySelectorAll('.md-button, .md-nav-link, .md-card, .md-chip');
    
    interactiveElements.forEach(element => {
      if (!element.classList.contains('md-state-layer')) {
        element.classList.add('md-state-layer');
      }
    });
  }
}

// Initialize Material Design 3 system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MaterialDesign3Manager();
});

// Add CSS animations
const additionalAnimations = `
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

@keyframes expandContent {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;

// Inject additional animations
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = additionalAnimations;
document.head.appendChild(animationStyleSheet);