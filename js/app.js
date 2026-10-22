/**
 * Riwaaz Clothing - Main Application Script
 * Features: Catalog Filters, Quick View, Cart, Wishlist, Size Guide, WhatsApp Integration
 * Dedicated WhatsApp Number: +91 8580540470
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global State
  const state = {
    products: PRODUCTS_DATA,
    filteredProducts: [...PRODUCTS_DATA],
    cart: JSON.parse(localStorage.getItem("riwaaz_cart") || "[]"),
    wishlist: JSON.parse(localStorage.getItem("riwaaz_wishlist") || "[]"),
    activeCategory: "all",
    activeOccasion: "all",
    activeFabric: "all",
    searchQuery: "",
    sortBy: "featured",
    appliedCoupon: null,
    discountPercent: 0,
    freeShippingThreshold: 2999
  };

  // DOM Elements
  const productGrid = document.getElementById("productGrid");
  const productsCountEl = document.getElementById("productsCount");
  const searchInput = document.getElementById("searchInput");
  const categoryPills = document.querySelectorAll(".filter-pill");
  const occasionFilter = document.getElementById("occasionFilter");
  const fabricFilter = document.getElementById("fabricFilter");
  const sortSelect = document.getElementById("sortSelect");

  // Cart & Wishlist Triggers & Drawers
  const cartBtn = document.getElementById("cartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartClose = document.getElementById("cartClose");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartCountBadges = document.querySelectorAll(".cart-count-badge");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountLine = document.getElementById("cartDiscountLine");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const cartShippingEl = document.getElementById("cartShipping");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartWaCheckoutBtn = document.getElementById("cartWaCheckoutBtn");
  const shippingProgressFill = document.getElementById("shippingProgressFill");
  const shippingProgressText = document.getElementById("shippingProgressText");
  const couponInput = document.getElementById("couponInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");

  const wishlistBtn = document.getElementById("wishlistBtn");
  const wishlistDrawer = document.getElementById("wishlistDrawer");
  const wishlistClose = document.getElementById("wishlistClose");
  const wishlistItemsList = document.getElementById("wishlistItemsList");
  const wishlistCountBadges = document.querySelectorAll(".wishlist-count-badge");

  const drawerOverlay = document.getElementById("drawerOverlay");
  const modalOverlay = document.getElementById("modalOverlay");
  const quickViewModal = document.getElementById("quickViewModal");
  const sizeGuideModal = document.getElementById("sizeGuideModal");
  const customOrderModal = document.getElementById("customOrderModal");

  // WhatsApp Concierge
  const waTriggerBtn = document.getElementById("waTriggerBtn");
  const waConciergePopover = document.getElementById("waConciergePopover");
  const waClosePopover = document.getElementById("waClosePopover");
  const waOptionPills = document.querySelectorAll(".wa-option-pill");

  // Custom Order Form
  const customOrderForm = document.getElementById("customOrderForm");

  // Toast Container
  const toastContainer = document.getElementById("toastContainer");

  // =========================================================================
  // UTILITY FUNCTIONS
  // =========================================================================
  const formatCurrency = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

  const showToast = (message, type = "success") => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "fa-check-circle text-whatsapp" : "fa-info-circle text-gold";
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  const generateWhatsAppLink = (message) => {
    const cleanNumber = WHATSAPP_CONFIG.phoneNumber.replace(/\D/g, "");
    const encoded = encodeURIComponent(message.trim());
    return `https://wa.me/91${cleanNumber}?text=${encoded}`;
  };

  const openWhatsApp = (message) => {
    const link = generateWhatsAppLink(message);
    window.open(link, "_blank");
  };

  // URL Query Parameters Handling (for collections.html?category=anarkali, etc.)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    state.activeCategory = urlParams.get("category");
  }
  if (urlParams.has("occasion")) {
    state.activeOccasion = urlParams.get("occasion");
    if (occasionFilter) occasionFilter.value = state.activeOccasion;
  }
  if (urlParams.has("fabric")) {
    state.activeFabric = urlParams.get("fabric");
    if (fabricFilter) fabricFilter.value = state.activeFabric;
  }
  if (urlParams.has("search")) {
    state.searchQuery = urlParams.get("search");
    if (searchInput) searchInput.value = state.searchQuery;
  }

  // Active Navigation Link Highlighting
  const currentPath = window.location.pathname.toLowerCase();
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (
      (currentPath.endsWith("collections.html") && href.includes("collections.html")) ||
      (currentPath.endsWith("about.html") && href.includes("about.html")) ||
      (currentPath.endsWith("custom-bridal.html") && href.includes("custom-bridal.html")) ||
      (currentPath.endsWith("contact.html") && href.includes("contact.html")) ||
      ((currentPath.endsWith("index.html") || currentPath === "/" || currentPath.endsWith("/fashion/") || currentPath.endsWith("/fashion")) && href === "index.html")
    ) {
      link.classList.add("active");
    } else if (href !== "#") {
      link.classList.remove("active");
    }
  });

  // Highlight category pill if set from URL
  if (categoryPills.length > 0) {
    categoryPills.forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.category === state.activeCategory);
    });
  }

  // Helper to build a product card HTML
  const createProductCardHTML = (product) => {
    const isWishlisted = state.wishlist.some((item) => item.id === product.id);
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="card-media" onclick="window.app.openQuickView('${product.id}')">
          <img src="${product.images[0]}" alt="${product.title}" class="card-img-primary" loading="lazy">
          ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.title}" class="card-img-hover" loading="lazy">` : ""}
          
          <div class="card-badges">
            ${product.discount ? `<span class="badge-tag badge-discount">${product.discount}</span>` : ""}
            ${product.isNew ? `<span class="badge-tag badge-new">New Arrival</span>` : ""}
            ${product.isBestseller ? `<span class="badge-tag badge-bestseller">Bestseller</span>` : ""}
          </div>

          <button class="card-wishlist-btn ${isWishlisted ? "active" : ""}" 
            title="${isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}"
            onclick="event.stopPropagation(); window.app.toggleWishlist('${product.id}')">
            <i class="${isWishlisted ? "fas" : "far"} fa-heart"></i>
          </button>

          <div class="card-quick-actions">
            <button class="btn-card-quick" onclick="event.stopPropagation(); window.app.openQuickView('${product.id}')">
              <i class="far fa-eye"></i> Quick View
            </button>
            <button class="btn-card-quick" onclick="event.stopPropagation(); window.app.quickAddToBag('${product.id}')">
              <i class="fas fa-shopping-bag"></i> Add to Bag
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span class="card-category">${product.categoryLabel}</span>
            <span class="card-rating"><i class="fas fa-star"></i> ${product.rating} (${product.reviewsCount})</span>
          </div>

          <h3 class="card-title">
            <a href="javascript:void(0)" onclick="window.app.openQuickView('${product.id}')">${product.title}</a>
          </h3>

          <div class="card-fabric">Fabric: ${product.fabric} • ${product.color}</div>

          <div class="card-price-row">
            <span class="card-price">${formatCurrency(product.price)}</span>
            ${product.compareAtPrice ? `<span class="card-compare-price">${formatCurrency(product.compareAtPrice)}</span>` : ""}
            ${product.discount ? `<span class="card-save-tag">Save ${product.discount}</span>` : ""}
          </div>

          <div class="card-actions">
            <button class="btn-card-bag" onclick="window.app.quickAddToBag('${product.id}')">
              <i class="fas fa-shopping-bag"></i> Bag
            </button>
            <button class="btn-card-wa" onclick="window.app.inquireOnWhatsApp('${product.id}')">
              <i class="fab fa-whatsapp"></i> Inquire
            </button>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // CATALOG & FEATURED SPOTLIGHT RENDERING
  // =========================================================================
  const renderProducts = () => {
    // 1. Render Featured Spotlight Grid on Home Page if present
    const featuredGrid = document.getElementById("featuredProductGrid");
    if (featuredGrid) {
      const spotlightProducts = state.products.filter((p) => p.featured || p.isBestseller).slice(0, 8);
      featuredGrid.innerHTML = spotlightProducts.map(createProductCardHTML).join("");
    }

    // 2. Render Full Filterable Catalog on Collections Page if present
    if (productGrid) {
      productGrid.innerHTML = "";

      if (state.filteredProducts.length === 0) {
        productGrid.innerHTML = `
          <div class="empty-catalog">
            <i class="fas fa-gem"></i>
            <h3>No royal silhouettes match your search</h3>
            <p class="text-muted">Try resetting your filters or search for another exquisite design.</p>
            <button class="btn-primary" style="margin-top: 16px;" id="resetFiltersBtn">Reset All Filters</button>
          </div>
        `;
        document.getElementById("resetFiltersBtn")?.addEventListener("click", resetFilters);
        if (productsCountEl) productsCountEl.textContent = "0 products found";
        return;
      }

      if (productsCountEl) {
        productsCountEl.textContent = `Showing ${state.filteredProducts.length} handcrafted pieces`;
      }

      productGrid.innerHTML = state.filteredProducts.map(createProductCardHTML).join("");
    }
  };

  const applyFilters = () => {
    let result = [...state.products];

    // Category Filter
    if (state.activeCategory !== "all") {
      result = result.filter((item) => item.category === state.activeCategory);
    }

    // Occasion Filter
    if (state.activeOccasion !== "all") {
      result = result.filter((item) => item.occasion === state.activeOccasion);
    }

    // Fabric Filter
    if (state.activeFabric !== "all") {
      result = result.filter((item) => item.fabric.toLowerCase().includes(state.activeFabric.toLowerCase()));
    }

    // Search Query Filter
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.fabric.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.color.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (state.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    state.filteredProducts = result;
    renderProducts();
  };

  const resetFilters = () => {

    state.activeCategory = "all";
    state.activeOccasion = "all";
    state.activeFabric = "all";
    state.searchQuery = "";
    state.sortBy = "featured";

    categoryPills.forEach((p) => p.classList.toggle("active", p.dataset.category === "all"));
    if (searchInput) searchInput.value = "";
    if (occasionFilter) occasionFilter.value = "all";
    if (fabricFilter) fabricFilter.value = "all";
    if (sortSelect) sortSelect.value = "featured";

    applyFilters();
  };

  // Event Listeners for Filters
  categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      categoryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.dataset.category;
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    applyFilters();
  });

  occasionFilter?.addEventListener("change", (e) => {
    state.activeOccasion = e.target.value;
    applyFilters();
  });

  fabricFilter?.addEventListener("change", (e) => {
    state.activeFabric = e.target.value;
    applyFilters();
  });

  sortSelect?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    applyFilters();
  });

  // Story Highlight click handler
  document.querySelectorAll(".story-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = item.dataset.category;
      state.activeCategory = cat;
      categoryPills.forEach((p) => p.classList.toggle("active", p.dataset.category === cat));
      applyFilters();
      document.getElementById("catalogSection")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // =========================================================================
  // SHOPPING CART (BAG) SYSTEM
  // =========================================================================
  const saveCart = () => {
    localStorage.setItem("riwaaz_cart", JSON.stringify(state.cart));
    updateCartUI();
  };

  const updateCartUI = () => {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach((badge) => {
      badge.textContent = totalCount;
      badge.classList.add("pulse");
      setTimeout(() => badge.classList.remove("pulse"), 350);
    });

    if (!cartItemsList) return;
    cartItemsList.innerHTML = "";

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="drawer-empty">
          <i class="fas fa-shopping-bag"></i>
          <h4>Your royal bag is empty</h4>
          <p>Discover our heirloom Anarkalis and embroidered Kurta sets to adorn your wardrobe.</p>
          <button class="btn-primary" onclick="window.app.goToCatalog()">
            Browse Collections
          </button>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(0);
      if (cartDiscountLine) cartDiscountLine.style.display = "none";
      if (cartShippingEl) cartShippingEl.textContent = "₹0";
      if (cartTotalEl) cartTotalEl.textContent = formatCurrency(0);
      if (shippingProgressFill) shippingProgressFill.style.width = "0%";
      if (shippingProgressText) shippingProgressText.textContent = "Free Express Shipping on orders over ₹2,999";
      if (cartWaCheckoutBtn) cartWaCheckoutBtn.disabled = true;
      return;
    }

    if (cartWaCheckoutBtn) cartWaCheckoutBtn.disabled = false;

    let subtotal = 0;

    state.cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <span class="cart-item-variant">Size: <strong>${item.selectedSize}</strong> • Color: ${item.color}</span>
          <span class="cart-item-price">${formatCurrency(item.price)}</span>
        </div>
        <div class="cart-item-controls">
          <button class="cart-item-remove" title="Remove" onclick="window.app.removeFromCart(${index})">
            <i class="far fa-trash-alt"></i>
          </button>
          <div class="cart-qty-stepper">
            <button class="cart-qty-btn" onclick="window.app.changeCartQty(${index}, -1)">-</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="window.app.changeCartQty(${index}, 1)">+</button>
          </div>
        </div>
      `;
      cartItemsList.appendChild(itemEl);
    });

    // Discount Calculation
    let discountAmount = 0;
    if (state.discountPercent > 0) {
      discountAmount = Math.round(subtotal * (state.discountPercent / 100));
      if (cartDiscountLine) cartDiscountLine.style.display = "flex";
      if (cartDiscountEl) cartDiscountEl.textContent = `-${formatCurrency(discountAmount)}`;
    } else {
      if (cartDiscountLine) cartDiscountLine.style.display = "none";
    }

    // Shipping Calculation
    const shipping = subtotal >= state.freeShippingThreshold || subtotal === 0 ? 0 : 149;
    const finalTotal = subtotal - discountAmount + shipping;

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(subtotal);
    if (cartShippingEl) cartShippingEl.textContent = shipping === 0 ? "FREE" : formatCurrency(shipping);
    if (cartTotalEl) cartTotalEl.textContent = formatCurrency(finalTotal);

    // Free Shipping Progress
    if (shippingProgressFill && shippingProgressText) {
      if (subtotal >= state.freeShippingThreshold) {
        shippingProgressFill.style.width = "100%";
        shippingProgressText.innerHTML = `🎉 Congratulations! You unlocked <strong>FREE Express Shipping</strong>!`;
      } else {
        const remaining = state.freeShippingThreshold - subtotal;
        const percent = Math.min(100, Math.round((subtotal / state.freeShippingThreshold) * 100));
        shippingProgressFill.style.width = `${percent}%`;
        shippingProgressText.innerHTML = `Add <strong>${formatCurrency(remaining)}</strong> more to unlock Free Express Delivery`;
      }
    }
  };

  const addToCart = (product, selectedSize = null) => {
    const size = selectedSize || product.sizes[0];
    const existing = state.cart.find((item) => item.id === product.id && item.selectedSize === size);

    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        color: product.color,
        selectedSize: size,
        quantity: 1
      });
    }

    saveCart();
    showToast(`Added "${product.title}" (Size: ${size}) to your bag!`, "success");
  };

  const changeCartQty = (index, delta) => {
    if (!state.cart[index]) return;
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  };

  const removeFromCart = (index) => {
    state.cart.splice(index, 1);
    saveCart();
    showToast("Item removed from bag", "info");
  };

  // Coupon Code Application
  applyCouponBtn?.addEventListener("click", () => {
    const code = couponInput?.value.trim().toUpperCase();
    if (code === "RIWAAZ10") {
      state.appliedCoupon = "RIWAAZ10";
      state.discountPercent = 10;
      updateCartUI();
      showToast("Coupon RIWAAZ10 applied! 10% Royal Discount unlocked.", "success");
    } else if (code === "") {
      showToast("Please enter a valid coupon code.", "info");
    } else {
      showToast("Invalid coupon code. Try RIWAAZ10 for 10% off.", "info");
    }
  });

  // =========================================================================
  // WHATSAPP COMMERCE & INQUIRY ENGINES (Routed to 8580540470)
  // =========================================================================

  // 1. WhatsApp Cart Checkout Message
  const checkoutOnWhatsApp = () => {
    if (state.cart.length === 0) {
      showToast("Your shopping bag is empty.", "info");
      return;
    }

    let subtotal = 0;
    let itemsText = "";

    state.cart.forEach((item, idx) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      itemsText += `\n${idx + 1}. *${item.title}*\n   • Size: ${item.selectedSize}\n   • Qty: ${item.quantity}\n   • Price: ₹${item.price} each (Total: ₹${itemTotal})\n`;
    });

    let discountAmount = 0;
    if (state.discountPercent > 0) {
      discountAmount = Math.round(subtotal * (state.discountPercent / 100));
    }
    const shipping = subtotal >= state.freeShippingThreshold ? 0 : 149;
    const finalTotal = subtotal - discountAmount + shipping;

    const message = `
👑 *NEW ORDER INQUIRY - RIWAAZ CLOTHING* 👑
----------------------------------------
Hello Riwaaz Team, I would like to place an order for the following handcrafted items:
${itemsText}
----------------------------------------
💰 *ORDER SUMMARY*:
• Subtotal: ₹${subtotal.toLocaleString("en-IN")}
${discountAmount > 0 ? `• Coupon (${state.appliedCoupon}): -₹${discountAmount.toLocaleString("en-IN")}\n` : ""}• Shipping: ${shipping === 0 ? "FREE Express" : `₹${shipping}`}
• *Estimated Payable*: *₹${finalTotal.toLocaleString("en-IN")}*
----------------------------------------
📍 *MY DELIVERY DETAILS*:
• Name: 
• Contact Number: 
• Delivery Address: 
• City & Pincode: 

Please confirm availability and dispatch timeline! Thank you!
    `.trim();

    openWhatsApp(message);
  };

  // 2. Single Product WhatsApp Inquiry
  const inquireOnWhatsApp = (productId, selectedSize = null) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;

    const size = selectedSize || product.sizes[0];
    const message = `
✨ *PRODUCT INQUIRY - RIWAAZ CLOTHING* ✨
----------------------------------------
Hello Riwaaz Team, I am interested in ordering this piece:

👗 *Product*: ${product.title}
🔖 *SKU/Code*: ${product.id}
📏 *Selected Size*: ${size}
🎨 *Color/Fabric*: ${product.color} (${product.fabric})
💵 *Price*: ₹${product.price.toLocaleString("en-IN")} (Original: ₹${product.compareAtPrice.toLocaleString("en-IN")})
🖼️ *Reference Image*: ${product.images[0]}

Could you please confirm if size *${size}* is ready to dispatch? Also, can you share any customization options or real fabric close-up video?

Thank you!
    `.trim();

    openWhatsApp(message);
  };

  // 3. Custom Bridal / Bulk Order Form Submission
  customOrderForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("coName")?.value.trim();
    const phone = document.getElementById("coPhone")?.value.trim();
    const occasion = document.getElementById("coOccasion")?.value;
    const date = document.getElementById("coDate")?.value;
    const budget = document.getElementById("coBudget")?.value;
    const notes = document.getElementById("coNotes")?.value.trim();

    const message = `
👑 *CUSTOM BRIDAL / BESPOKE INQUIRY - RIWAAZ CLOTHING* 👑
-------------------------------------------------------
Hello Riwaaz Designer Team, I would like to discuss a custom ethnic wear order:

👤 *Client Name*: ${name}
📞 *Client Phone*: ${phone}
🎊 *Occasion*: ${occasion}
📅 *Event / Needed By Date*: ${date || "Flexible"}
💎 *Target Budget*: ${budget || "To Be Discussed"}

📝 *Design Requirements / Measurements*:
${notes || "Please connect with me for bespoke measurements and fabric choices."}

Looking forward to hearing from your master stylists at 8580540470!
    `.trim();

    closeModals();
    openWhatsApp(message);
    showToast("Opening WhatsApp with your bespoke request...", "success");
  });

  // Dedicated Contact Page Form
  const contactPageForm = document.getElementById("contactPageForm");
  contactPageForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName")?.value.trim();
    const phone = document.getElementById("contactPhone")?.value.trim();
    const subject = document.getElementById("contactSubject")?.value || "General Inquiry";
    const msg = document.getElementById("contactMessage")?.value.trim();

    const message = `
💬 *WEBSITE INQUIRY - RIWAAZ CLOTHING* 💬
----------------------------------------
Hello Riwaaz Team, I have an inquiry:

👤 *Name*: ${name}
📞 *Phone*: ${phone}
📌 *Subject*: ${subject}
📝 *Message*:
${msg}

Please assist me directly on WhatsApp! Thank you!
    `.trim();

    openWhatsApp(message);
    showToast("Opening WhatsApp with your inquiry...", "success");
  });

  // 4. Floating WhatsApp Concierge Presets

  waOptionPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const intent = pill.dataset.intent;
      let msg = "";

      switch (intent) {
        case "size":
          msg = "Hi Riwaaz Clothing! I need styling and sizing assistance. Could you help me pick the right size for my measurements?";
          break;
        case "bridal":
          msg = "Namaste! I am looking for exquisite bridal / wedding festive wear for an upcoming celebration. Can you share your exclusive bespoke catalog?";
          break;
        case "track":
          msg = "Hello Riwaaz Clothing! I'd like to check on my order dispatch status and delivery timeline.";
          break;
        case "stylist":
        default:
          msg = "Hi Riwaaz Team! I saw your stunning collection online and would love to chat with a stylist.";
          break;
      }

      waConciergePopover?.classList.remove("active");
      openWhatsApp(msg);
    });
  });

  // =========================================================================
  // WISHLIST SYSTEM
  // =========================================================================
  const saveWishlist = () => {
    localStorage.setItem("riwaaz_wishlist", JSON.stringify(state.wishlist));
    updateWishlistUI();
    renderProducts();
  };

  const updateWishlistUI = () => {
    wishlistCountBadges.forEach((badge) => {
      badge.textContent = state.wishlist.length;
      badge.classList.add("pulse");
      setTimeout(() => badge.classList.remove("pulse"), 350);
    });

    if (!wishlistItemsList) return;
    wishlistItemsList.innerHTML = "";

    if (state.wishlist.length === 0) {
      wishlistItemsList.innerHTML = `
        <div class="drawer-empty">
          <i class="far fa-heart"></i>
          <h4>Your wishlist is waiting</h4>
          <p>Tap the heart icon on any outfit you love to save it here for later.</p>
          <button type="button" class="btn-primary" onclick="window.app ? window.app.goToCatalog() : null">
            Explore Collection
          </button>
          <button type="button" class="btn-secondary" style="margin-top: 12px; width: 100%; justify-content: center;" onclick="window.app ? window.app.closeDrawers() : null">
            Continue Shopping
          </button>
        </div>
      `;
      return;
    }

    state.wishlist.forEach((product, idx) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${product.title}</h4>
          <span class="cart-item-variant">${product.categoryLabel} • ${product.fabric}</span>
          <span class="cart-item-price">${formatCurrency(product.price)}</span>
        </div>
        <div class="cart-item-controls">
          <button class="cart-item-remove" title="Remove" onclick="window.app.toggleWishlist('${product.id}')">
            <i class="fas fa-times"></i>
          </button>
          <button class="btn-card-bag" style="padding: 4px 8px; font-size: 0.72rem; margin-top: 8px;" onclick="window.app.quickAddToBag('${product.id}')">
            <i class="fas fa-shopping-bag"></i> Add
          </button>
        </div>
      `;
      wishlistItemsList.appendChild(itemEl);
    });
  };

  const toggleWishlist = (productId) => {
    const existingIdx = state.wishlist.findIndex((item) => item.id === productId);
    if (existingIdx >= 0) {
      state.wishlist.splice(existingIdx, 1);
      showToast("Removed from wishlist", "info");
    } else {
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        state.wishlist.push(product);
        showToast("Saved to your royal wishlist!", "success");
      }
    }
    saveWishlist();
  };

  // =========================================================================
  // QUICK VIEW MODAL
  // =========================================================================
  let currentQvProduct = null;
  let currentQvSelectedSize = null;

  const openQuickView = (productId) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product || !quickViewModal) return;

    currentQvProduct = product;
    currentQvSelectedSize = product.sizes[0];

    const qvBody = quickViewModal.querySelector(".modal-dialog");
    if (!qvBody) return;

    qvBody.innerHTML = `
      <button class="modal-close-btn" onclick="window.app.closeModals()"><i class="fas fa-times"></i></button>
      <div class="qv-grid">
        <div class="qv-gallery">
          <div class="qv-main-img-wrap">
            <img src="${product.images[0]}" alt="${product.title}" class="qv-main-img" id="qvMainImg">
          </div>
          <div class="qv-thumbs">
            ${product.images
              .map(
                (img, idx) => `
              <img src="${img}" alt="${product.title}" class="qv-thumb ${idx === 0 ? "active" : ""}" 
                onclick="window.app.switchQvImage('${img}', this)">
            `
              )
              .join("")}
          </div>
        </div>

        <div class="qv-details">
          <span class="qv-tag">${product.categoryLabel} • ${product.occasionLabel}</span>
          <h2 class="qv-title">${product.title}</h2>
          
          <div class="qv-price-row">
            <span class="qv-price">${formatCurrency(product.price)}</span>
            ${product.compareAtPrice ? `<span class="qv-compare">${formatCurrency(product.compareAtPrice)}</span>` : ""}
            ${product.discount ? `<span class="qv-discount">${product.discount}</span>` : ""}
          </div>

          <p class="qv-desc">${product.description}</p>

          <div class="qv-size-section">
            <div class="qv-size-header">
              <span>Select Size: <strong id="qvSelectedSizeLabel">${currentQvSelectedSize}</strong></span>
              <span class="btn-size-guide-link" onclick="window.app.openSizeGuide()">
                <i class="fas fa-ruler-combined"></i> Size Guide
              </span>
            </div>
            <div class="qv-sizes-row">
              ${product.sizes
                .map(
                  (size, idx) => `
                <button class="qv-size-btn ${idx === 0 ? "active" : ""}" 
                  onclick="window.app.selectQvSize('${size}', this)">${size}</button>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="qv-action-buttons">
            <button class="btn-qv-wa" onclick="window.app.inquireOnWhatsApp('${product.id}', window.app.getQvSelectedSize())">
              <i class="fab fa-whatsapp"></i> Order / Inquire on WhatsApp
            </button>
            <button class="btn-qv-bag" onclick="window.app.addCurrentQvToBag()">
              <i class="fas fa-shopping-bag"></i> Add to Shopping Bag
            </button>
          </div>

          <ul class="qv-specs-list">
            ${product.details.map((d) => `<li><i class="fas fa-certificate"></i> ${d}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;

    openModal(quickViewModal);
  };

  const switchQvImage = (src, thumbEl) => {
    const mainImg = document.getElementById("qvMainImg");
    if (mainImg) mainImg.src = src;
    document.querySelectorAll(".qv-thumb").forEach((t) => t.classList.remove("active"));
    thumbEl?.classList.add("active");
  };

  const selectQvSize = (size, btnEl) => {
    currentQvSelectedSize = size;
    const label = document.getElementById("qvSelectedSizeLabel");
    if (label) label.textContent = size;
    document.querySelectorAll(".qv-size-btn").forEach((b) => b.classList.remove("active"));
    btnEl?.classList.add("active");
  };

  const addCurrentQvToBag = () => {
    if (currentQvProduct) {
      addToCart(currentQvProduct, currentQvSelectedSize);
      closeModals();
      openCart();
    }
  };

  // =========================================================================
  // SIZE GUIDE MODAL (Inches & CM)
  // =========================================================================
  let sizeUnit = "inches";

  const openSizeGuide = () => {
    renderSizeGuideTable();
    openModal(sizeGuideModal);
  };

  const setSizeUnit = (unit) => {
    sizeUnit = unit;
    document.querySelectorAll(".size-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.unit === unit);
    });
    renderSizeGuideTable();
  };

  const renderSizeGuideTable = () => {
    const tableBody = document.getElementById("sizeTableBody");
    if (!tableBody) return;
    const data = SIZE_GUIDE_DATA[sizeUnit];
    tableBody.innerHTML = data
      .map(
        (row) => `
      <tr>
        <td><strong>${row.size}</strong></td>
        <td>${row.bust} ${sizeUnit === "inches" ? '"' : "cm"}</td>
        <td>${row.waist} ${sizeUnit === "inches" ? '"' : "cm"}</td>
        <td>${row.hip} ${sizeUnit === "inches" ? '"' : "cm"}</td>
        <td>${row.kurtaLength} ${sizeUnit === "inches" ? '"' : "cm"}</td>
      </tr>
    `
      )
      .join("");
  };

  // =========================================================================
  // DRAWER & MODAL TOGGLE HELPERS
  // =========================================================================
  const openCart = () => {
    closeDrawers();
    cartDrawer?.classList.add("active");
    drawerOverlay?.classList.add("active");
    document.body.classList.add("drawer-open");
  };

  const openWishlist = () => {
    closeDrawers();
    wishlistDrawer?.classList.add("active");
    drawerOverlay?.classList.add("active");
    document.body.classList.add("drawer-open");
  };

  const toggleWishlistDrawer = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (wishlistDrawer?.classList.contains("active")) {
      closeDrawers();
    } else {
      openWishlist();
    }
  };

  const toggleCartDrawer = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (cartDrawer?.classList.contains("active")) {
      closeDrawers();
    } else {
      openCart();
    }
  };

  const closeDrawers = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    cartDrawer?.classList.remove("active");
    wishlistDrawer?.classList.remove("active");
    drawerOverlay?.classList.remove("active");
    document.body.classList.remove("drawer-open");
  };

  const openModal = (modalEl) => {
    closeModals();
    if (modalEl) {
      modalEl.classList.add("active");
      modalEl.style.display = "block";
      modalOverlay?.classList.add("active");
    }
  };

  const closeModals = () => {
    document.querySelectorAll(".modal-container").forEach((m) => {
      m.classList.remove("active");
      m.style.display = "none";
    });
    modalOverlay?.classList.remove("active");
  };


  // Event Listeners for Drawers & Modals
  cartBtn?.addEventListener("click", toggleCartDrawer);
  cartClose?.addEventListener("click", closeDrawers);
  cartClose?.addEventListener("touchend", closeDrawers);

  wishlistBtn?.addEventListener("click", toggleWishlistDrawer);
  wishlistClose?.addEventListener("click", closeDrawers);
  wishlistClose?.addEventListener("touchend", closeDrawers);

  drawerOverlay?.addEventListener("click", closeDrawers);
  drawerOverlay?.addEventListener("touchend", closeDrawers);

  modalOverlay?.addEventListener("click", closeModals);
  cartWaCheckoutBtn?.addEventListener("click", checkoutOnWhatsApp);

  // Close drawers & modals with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.keyCode === 27) {
      closeDrawers();
      closeModals();
    }
  });

  // Global Outside-Click Listener: Closes any open drawer when clicking outside it
  document.addEventListener("click", (e) => {
    const isWishlistOpen = wishlistDrawer?.classList.contains("active");
    const isCartOpen = cartDrawer?.classList.contains("active");

    if (!isWishlistOpen && !isCartOpen) return;

    // Check if click was inside an active drawer or on its trigger buttons
    const insideWishlist = wishlistDrawer?.contains(e.target);
    const insideCart = cartDrawer?.contains(e.target);
    const onWishlistTrigger = wishlistBtn?.contains(e.target) || document.getElementById("mobNavWishlist")?.contains(e.target);
    const onCartTrigger = cartBtn?.contains(e.target) || document.getElementById("mobNavCart")?.contains(e.target);
    const onCardAction = e.target.closest && (e.target.closest(".card-wishlist-btn") || e.target.closest(".btn-card-bag") || e.target.closest(".btn-qv-bag"));

    if (isWishlistOpen && !insideWishlist && !onWishlistTrigger && !onCardAction) {
      closeDrawers();
    }

    if (isCartOpen && !insideCart && !onCartTrigger && !onCardAction) {
      closeDrawers();
    }
  });

  // Floating WhatsApp Concierge Toggle
  waTriggerBtn?.addEventListener("click", () => {
    waConciergePopover?.classList.toggle("active");
  });
  waClosePopover?.addEventListener("click", () => {
    waConciergePopover?.classList.remove("active");
  });

  const goToCatalog = () => {
    closeDrawers();
    const catalogSec = document.getElementById("catalogSection") || document.getElementById("featuredProductGrid") || document.getElementById("productGrid");
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "collections.html";
    }
  };

  // Mobile Bottom Nav Hooks
  document.getElementById("mobNavHome")?.addEventListener("click", () => {
    const p = window.location.pathname.toLowerCase();
    if (p.endsWith("index.html") || p === "/" || p.endsWith("/fashion/") || p.endsWith("/fashion")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "index.html";
    }
  });
  document.getElementById("mobNavCatalog")?.addEventListener("click", goToCatalog);
  document.getElementById("mobNavWishlist")?.addEventListener("click", toggleWishlistDrawer);
  document.getElementById("mobNavCart")?.addEventListener("click", toggleCartDrawer);
  document.getElementById("mobNavWhatsApp")?.addEventListener("click", () => {
    openWhatsApp(WHATSAPP_CONFIG.defaultGreeting);
  });

  // Mobile Menu Drawer Button (Hamburger)
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNavLinks = document.getElementById("mainNavLinks");
  mobileMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    mainNavLinks?.classList.toggle("mobile-menu-active");
  });

  // Close mobile menu if clicked outside
  document.addEventListener("click", (e) => {
    if (mainNavLinks?.classList.contains("mobile-menu-active") && !mainNavLinks.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      mainNavLinks.classList.remove("mobile-menu-active");
    }
  });

  // Toggle mobile dropdown for collections
  document.querySelectorAll(".nav-item-dropdown > .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  // FAQ Accordion Toggle
  document.querySelectorAll(".faq-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const body = item.querySelector(".faq-body");
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((f) => {
        f.classList.remove("active");
        f.querySelector(".faq-body").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // =========================================================================
  // EXPOSE GLOBAL APIS TO WINDOW
  // =========================================================================
  window.app = {
    openQuickView,
    switchQvImage,
    selectQvSize,
    getQvSelectedSize: () => currentQvSelectedSize,
    addCurrentQvToBag,
    quickAddToBag: (id) => {
      const p = state.products.find((item) => item.id === id);
      if (p) {
        addToCart(p);
        openCart();
      }
    },
    inquireOnWhatsApp,
    toggleWishlist,
    changeCartQty,
    removeFromCart,
    openCart,
    openWishlist,
    toggleWishlistDrawer,
    toggleCartDrawer,
    closeDrawers,
    openSizeGuide,
    setSizeUnit,
    filterByCategory: (cat) => {
      state.activeCategory = cat;
      categoryPills.forEach((p) => p.classList.toggle("active", p.dataset.category === cat));
      applyFilters();
      document.getElementById("catalogSection")?.scrollIntoView({ behavior: "smooth" });
    },
    openCustomOrderModal: () => openModal(customOrderModal),
    goToCatalog,
    closeModals
  };


  // Initial Boot
  renderProducts();
  updateCartUI();
  updateWishlistUI();
});
