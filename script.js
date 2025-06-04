
const textArray = ["Frontend Developer", "UI/UX Designer"];
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 300); // Typing speed
  } else {
    setTimeout(erase, 500); // Wait before erasing
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50); // Erase speed
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, 500); // Wait before typing next
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, 500);
});


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


document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const offCanvasMenu = document.querySelector('.off-canvas-menu');
  const navLinks = document.querySelectorAll('.off-canvas-menu a'); // Select links in the off-canvas menu

  hamburgerMenu.addEventListener('click', function () {
    hamburgerMenu.classList.toggle('active');
    offCanvasMenu.classList.toggle('active');
    // Prevent body scrolling when the menu is open
    document.body.classList.toggle('no-scroll');
  });

  // Close the off-canvas menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburgerMenu.classList.remove('active');
      offCanvasMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Optional: Close menu if clicking outside (simple version)
  // You might need a more robust solution for complex layouts
  document.addEventListener('click', function (event) {
    if (!offCanvasMenu.contains(event.target) && !hamburgerMenu.contains(event.target) && offCanvasMenu.classList.contains('active')) {
      hamburgerMenu.classList.remove('active');
      offCanvasMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});
