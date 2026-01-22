let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentService = '';

const productsDB = {
  'Supermarket': [{name: 'Rice', price: 30},{name: 'Milk', price: 15},{name: 'Bread', price: 10}],
  'Pharmacy': [{name: 'Paracetamol', price: 20},{name: 'Vitamin C', price: 25}],
  'Fruits & Vegetables': [{name: 'Apple', price: 5},{name: 'Tomato', price: 3}],
  'Restaurants': [{name: 'Burger', price: 50},{name: 'Pizza', price: 80}]
};

// Login / Signup
function sendOTP() {
  const phone = document.getElementById('phone').value;
  const name = document.getElementById('name').value;
  if(phone === '') { alert('Enter phone number'); return; }
  localStorage.setItem('userPhone', phone);
  if(name !== '') { localStorage.setItem('userName', name); }
  alert('OTP sent to ' + phone + ' (Use 1234 for demo)');
}

function verifyOTP() {
  const otp = document.getElementById('otp').value;
  if(otp === '1234') {
    alert('OTP verified! Redirecting to services...');
    window.location.href = 'services.html';
  } else {
    alert('Invalid OTP');
  }
}

// Services
function openProducts(service) {
  currentService = service;
  window.location.href = 'products.html';
}

// Products Page
function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + ' added to cart');
}

function goToCart() {
  window.location.href = 'cart.html';
}

function updateCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement('div');
    div.innerHTML = `${item.name} - ${item.price} EGP <button onclick="removeFromCart(${i})">Remove</button>`;
    list.appendChild(div);
  });
  document.getElementById('cart-total').innerText = total;
  document.getElementById('payment-total').innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// Tracking
function goToTracking() {
  window.location.href = 'tracking.html';
}

// Payment
function goToPayment() {
  window.location.href = 'payment.html';
  generateQRCode();
}

function generateQRCode() {
  const qrDiv = document.getElementById('qr-code');
  qrDiv.innerHTML = '';
  new QRCode(qrDiv, {
    text: JSON.stringify({cart: cart, total: cart.reduce((a,b)=>a+b.price,0)}),
    width: 200,
    height: 200
  });
}

function completePayment() {
  alert('Payment completed! Thank you for your order.');
  cart = [];
  localStorage.removeItem('cart');
  window.location.href = 'services.html';
}
