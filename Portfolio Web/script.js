// script.js

// Function to toggle theme
function toggleTheme() {
  const body = document.body;
  const logo = document.getElementById('logo');
  const themeIcon = document.getElementById('theme-icon');

  if (body.classList.contains('dark-mode')) {
    // Switch to light mode
    body.classList.remove('dark-mode');
    // Update logo for light mode (assuming you have a light theme logo)
    if (logo) logo.src = 'assets/images/light-theme-logo.png'; // Check if logo exists
    if (themeIcon) themeIcon.src = 'assets/icons/moon.svg'; // Change to moon icon for light mode
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark mode
    body.classList.add('dark-mode');
    // Update logo for dark mode
    if (logo) logo.src = 'assets/images/dark-theme-logo.png'; // Check if logo exists
    if (themeIcon) themeIcon.src = 'assets/icons/sun.svg'; // Change to sun icon for dark mode
    localStorage.setItem('theme', 'dark');
  }
}

// Function to set theme on page load
function setThemeOnLoad() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const logo = document.getElementById('logo');
  const themeIcon = document.getElementById('theme-icon');

  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    if (logo) logo.src = 'assets/images/light-theme-logo.png';
    if (themeIcon) themeIcon.src = 'assets/icons/moon.svg';
  } else {
    // Default to dark mode if no theme saved or saved theme is 'dark'
    body.classList.add('dark-mode');
    if (logo) logo.src = 'assets/images/dark-theme-logo.png';
    if (themeIcon) themeIcon.src = 'assets/icons/sun.svg';
  }

  // --- NEW: Handle initial fade-in on page load for the overlay ---
  const overlay = document.querySelector('.page-transition-overlay');
  if (overlay) {
    // If the page just loaded, and we were animating, the overlay is currently full opacity.
    // Remove the active class after a very short delay to start the fade-out.
    // This makes the incoming page appear to "fade in"
    setTimeout(() => {
      document.body.classList.remove('page-transition-active');
    }, 50); // Small delay to ensure CSS applied before removal
  }
}


// --- About Popup Functionality ---
const aboutPopupOverlay = document.querySelector('.about-popup-overlay');
const closePopupButton = document.querySelector('.close-popup');

// Function to open the about me popup
function openAboutPopup() {
  if (aboutPopupOverlay) {
    aboutPopupOverlay.classList.add('active');
  }
  document.body.classList.add('popup-active'); // Add class to body to blur and prevent scroll
}

// Function to close the about me popup
function closeAboutPopup() {
  if (aboutPopupOverlay) {
    aboutPopupOverlay.classList.remove('active');
  }
  document.body.classList.remove('popup-active'); // Remove class from body
}

// Add event listeners for the about me popup if elements exist
if (closePopupButton) {
  closePopupButton.addEventListener('click', closeAboutPopup);
}
if (aboutPopupOverlay) {
  // Close popup if clicked outside content
  aboutPopupOverlay.addEventListener('click', (event) => {
    if (event.target === aboutPopupOverlay) {
      closeAboutPopup();
    }
  });
}


// --- NEW: Page Transition Logic for "My Projects" button ---
// This ensures the animation plays before navigation on index.html
const projectsButton = document.querySelector('.projects-button');

if (projectsButton) { // Ensure the button exists (it's only on index.html)
  projectsButton.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior (immediate navigation)

    const targetUrl = this.href; // Get the URL from the button's href
    document.body.classList.add('page-transition-active'); // Add class to body to trigger fade-out

    // After the animation duration (400ms from CSS), navigate to the new page
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 400); // This duration must match the CSS transition duration
  });
}

// Call setThemeOnLoad when the DOM is fully loaded on both pages
document.addEventListener('DOMContentLoaded', setThemeOnLoad);