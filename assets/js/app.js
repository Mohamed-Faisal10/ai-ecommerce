/* ==========================================================================
   NEUVANGUARD AI COMMERCE - APPLICATION & AI REASONING LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Expanded Product Catalog (12+ Elite Items)
  const products = [
    { id: 1, title: 'Quantum Neural Visor X', category: 'Smart Eyewear', mood: 'Cyberpunk', price: 349.00, image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80', badge: 'AI Optimized', desc: 'HUD augmented reality glasses with real-time biometric telemetry.' },
    { id: 2, title: 'Titanium Obsidian Shell', category: 'Outerwear', mood: 'Executive', price: 289.00, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80', badge: 'Best Seller', desc: 'Aerospace-grade waterproof membrane with thermal regulation.' },
    { id: 3, title: 'Aetheris Haptic Keyboard', category: 'Peripherals', mood: 'Minimalist', price: 210.00, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80', badge: 'Neural Sync', desc: 'Custom tactile feedback mechanics milled from solid aircraft aluminum.' },
    { id: 4, title: 'Apex Chrono Smartwatch', category: 'Wearables', mood: 'Performance', price: 420.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', badge: 'AI Health Core', desc: 'Continuous blood oxygen, stress hormone, and energy output tracker.' },
    { id: 5, title: 'Vanguard Cyber Backpack', category: 'Accessories', mood: 'Cyberpunk', price: 175.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', badge: 'Limited Edition', desc: 'RFID-shielded modular carbon-fiber carrying vault with solar ports.' },
    { id: 6, title: 'Zenith Acoustic Pods', category: 'Audio', mood: 'Minimalist', price: 199.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', badge: 'Active AI ANC', desc: 'Adaptive neural noise cancellation tuned to your exact ear canal geometry.' },
    { id: 7, title: 'Kuro Autonomous Drone', category: 'Robotics', mood: 'Performance', price: 890.00, image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80', badge: 'Autonomous 4K', desc: 'Self-navigating obstacle-avoidance cinematic reconnaissance drone.' },
    { id: 8, title: 'Executive Neural Ledger', category: 'Hardware', mood: 'Executive', price: 145.00, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', badge: 'Encrypted', desc: 'Biometric hardware cold-storage vault for digital assets and keys.' },
    { id: 9, title: 'Neon Flux Hydro Flask', category: 'Lifestyle', mood: 'Cyberpunk', price: 65.00, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80', badge: 'Thermal Core', desc: 'Self-cleaning UV-C sterilizing hydration container with LED status.' },
    { id: 10, title: 'Minimalist Horizon Lamp', category: 'Home', mood: 'Minimalist', price: 130.00, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80', badge: 'Circadian AI', desc: 'Automatically adjusts color temperature to match natural solar cycles.' },
    { id: 11, title: 'Cybernetic Running Matrix', category: 'Footwear', mood: 'Performance', price: 240.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', badge: 'Kinetic Energy', desc: 'Adaptive carbon-plated soles with impact-absorbing shock matrices.' },
    { id: 12, title: 'Apex Titanium Multitool', category: 'Accessories', mood: 'Executive', price: 95.00, image: 'https://images.unsplash.com/photo-1589365278144-c9e705f7cfc8?auto=format&fit=crop&w=600&q=80', badge: 'Grade 5 Alloy', desc: '24 functional instruments packed into an ultra-slim titanium chassis.' }
  ];

  let cart = [];
  let currentMood = 'all';
  let searchQuery = '';

  // DOM Elements
  const productGrid = document.getElementById('productGrid');
  const itemCountEl = document.getElementById('itemCount');
  const searchInput = document.getElementById('searchInput');
  const moodPills = document.getElementById('moodPills');
  
  // Drawers & Modals
  const aiChatDrawer = document.getElementById('aiChatDrawer');
  const openAiChatBtn = document.getElementById('openAiChatBtn');
  const closeAiChat = document.getElementById('closeAiChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  const cartDrawer = document.getElementById('cartDrawer');
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartCount = document.getElementById('cartCount');
  const cartDrawerCount = document.getElementById('cartDrawerCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  const visualSearchModal = document.getElementById('visualSearchModal');
  const openVisualSearch = document.getElementById('openVisualSearch');
  const closeVisualModal = document.getElementById('closeVisualModal');

  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutModal = document.getElementById('closeCheckoutModal');
  const checkoutItemCount = document.getElementById('checkoutItemCount');
  const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
  const paymentForm = document.getElementById('paymentForm');

  const toast = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Render Product Catalog
  function renderProducts() {
    let filtered = products.filter(p => {
      const matchesMood = currentMood === 'all' || p.mood === currentMood;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMood && matchesSearch;
    });

    itemCountEl.textContent = `Showing ${filtered.length} items`;

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: span 3; text-align: center; padding: 60px; color: var(--text-muted);">
          <i class="fa-solid fa-brain" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--primary);"></i>
          <h3>No neural matches found</h3>
          <p>Try adjusting your search criteria or select a different AI vibe filter.</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(p => `
      <article class="product-card">
        <div class="product-image-box">
          <span class="product-badge">${p.badge}</span>
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="product-details">
          <span class="product-category">${p.category}</span>
          <h3 class="product-title">${p.title}</h3>
          <p class="product-desc">${p.desc}</p>
        </div>
        <div class="product-footer">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="btn btn-primary" data-action="add" data-id="${p.id}">
            <i class="fa-solid fa-cart-plus"></i> Acquire
          </button>
        </div>
      </article>
    `).join('');
  }

  // Cart Management
  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartCount.textContent = totalItems;
    cartDrawerCount.textContent = totalItems;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 50px 20px; color: var(--text-muted);">
          <i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
          <p>Your cart is currently empty.</p>
        </div>
      `;
      return;
    }

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} &times; ${item.qty}</div>
        </div>
        <button class="close-drawer" data-action="remove" data-id="${item.id}" title="Remove">
          <i class="fa-solid fa-trash-can" style="font-size: 0.9rem;"></i>
        </button>
      </div>
    `).join('');
  }

  // Add to Cart
  productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="add"]');
    if (!btn) return;
    const id = Number(btn.getAttribute('data-id'));
    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    renderCart();
    showToast(`Acquired "${product.title}"`);
  });

  cartItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove"]');
    if (!btn) return;
    const id = Number(btn.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== id);
    renderCart();
    showToast('Item removed from cart');
  });

  // Search & Filters
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  moodPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.mood-pill');
    if (!pill) return;
    document.querySelectorAll('.mood-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentMood = pill.getAttribute('data-mood');
    renderProducts();
  });

  // Drawers Toggle
  openAiChatBtn.addEventListener('click', () => aiChatDrawer.classList.add('active'));
  closeAiChat.addEventListener('click', () => aiChatDrawer.classList.remove('active'));
  aiChatDrawer.addEventListener('click', (e) => { if (e.target === aiChatDrawer) aiChatDrawer.classList.remove('active'); });

  openCartBtn.addEventListener('click', () => cartDrawer.classList.add('active'));
  closeCart.addEventListener('click', () => cartDrawer.classList.remove('active'));
  cartDrawer.addEventListener('click', (e) => { if (e.target === cartDrawer) cartDrawer.classList.remove('active'); });

  openVisualSearch.addEventListener('click', () => visualSearchModal.classList.add('active'));
  closeVisualModal.addEventListener('click', () => visualSearchModal.classList.remove('active'));
  visualSearchModal.addEventListener('click', (e) => { if (e.target === visualSearchModal) visualSearchModal.classList.remove('active'); });

  // AI Chat Simulation (Gemini API Connected Flow)
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    chatMessages.innerHTML += `<div class="chat-bubble user">${text}</div>`;
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI Neural Reasoning response
    setTimeout(() => {
      let reply = `Based on your query "${text}", I recommend checking out our Quantum Neural Visor or Titanium Obsidian Shell for peak performance.`;
      const lower = text.toLowerCase();
      if (lower.includes('jacket') || lower.includes('warm') || lower.includes('cold')) {
        reply = 'For cold or harsh conditions, the Titanium Obsidian Shell offers aerospace-grade thermal insulation.';
      } else if (lower.includes('audio') || lower.includes('sound') || lower.includes('music')) {
        reply = 'The Zenith Acoustic Pods feature adaptive neural noise cancellation tuned to your ear canal geometry.';
      }
      chatMessages.innerHTML += `<div class="chat-bubble ai">${reply}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  });

  // Visual Search Scans
  document.querySelector('.sample-scans').addEventListener('click', (e) => {
    const chip = e.target.closest('.scan-chip');
    if (!chip) return;
    const query = chip.getAttribute('data-query');
    visualSearchModal.classList.remove('active');
    searchInput.value = query;
    searchQuery = query;
    renderProducts();
    showToast(`Neural vision match applied for "${query}"`);
  });

  // Checkout Flow
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    cartDrawer.classList.remove('active');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    checkoutItemCount.textContent = `${totalItems} items`;
    checkoutTotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    checkoutModal.classList.add('active');
  });

  closeCheckoutModal.addEventListener('click', () => checkoutModal.classList.remove('active'));
  checkoutModal.addEventListener('click', (e) => { if (e.target === checkoutModal) checkoutModal.classList.remove('active'); });

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkoutModal.classList.remove('active');
    cart = [];
    renderCart();
    showToast('Secure quantum transaction authorized successfully!');
  });

  // Initial Render
  renderProducts();
  renderCart();
});
