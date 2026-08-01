// =========================
// Mobile Menu Toggle
// =========================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close the mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// =========================
// Cart Functionality
// =========================
let cart = [];

const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li class="empty">No items added yet.</li>';
    cartTotalEl.textContent = '0';
    return;
  }

  cartItemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = total.toFixed(2);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.menu-card');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    cart.push({ name, price });
    renderCart();

    // Quick visual feedback on the button
    e.target.textContent = 'Added ✓';
    setTimeout(() => {
      e.target.textContent = 'Add to Cart';
    }, 1000);
  });
});

// =========================
// Contact Form Handling
// =========================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    formStatus.textContent = `Thanks, ${name}! Your message has been received.`;
    contactForm.reset();
  } else {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.style.color = '#c92e3a';
  }
});

// =========================
// Footer Year (auto-update)
// =========================
document.getElementById('year').textContent = new Date().getFullYear();