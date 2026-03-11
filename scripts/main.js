// main.js - Core functionality for Organic Store

document.addEventListener("DOMContentLoaded", () => {
  // === Shopping Cart Implementation ===

  // We'll store our cart data in a simple array. State could ideally be persisted to localStorage.
  let cart = getCartFromStorage();

  // DOM Elements
  const cartBadge = document.getElementById("cartBadge");
  const cartTotalDisplay = document.getElementById("cartTotal");
  const productCards = document.querySelectorAll(
    ".best-product-card, .trending-product-card, .category-card",
  ); // Adding all relevant generic product cards if they have products

  /**
   * Helper to get cart from localStorage
   */
  function getCartFromStorage() {
    const storedCart = localStorage.getItem("organic_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }

  /**
   * Helper to save cart to localStorage
   */
  function saveCartToStorage() {
    localStorage.setItem("organic_cart", JSON.stringify(cart));
  }

  /**
   * Updates the UI elements based on the current cart data
   */
  function updateCartUI() {
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    if (cartBadge) {
      cartBadge.textContent = totalItems;
    }

    if (cartTotalDisplay) {
      // Format price to 2 decimal places
      cartTotalDisplay.textContent = totalPrice.toFixed(2);
    }

    // Save state so it persists across page reloads
    saveCartToStorage();
  }

  /**
   * Adds a product to the cart
   * @param {Object} product - Product details
   */
  function addToCart(product) {
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.name === product.name,
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCartUI();

    // Optional visual feedback upon adding
    showAddedFeedback(product.name);
  }

  /**
   * Optional small visual feedback toast/alert
   */
  function showAddedFeedback(productName) {
    // You can convert this into a beautiful toast notification in the future
    console.log(`Added ${productName} to cart!`);

    // Simple scale effect on cart button
    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn) {
      cartBtn.style.transform = "scale(1.2)";
      setTimeout(() => {
        cartBtn.style.transform = "scale(1)";
      }, 200);
    }
  }

  /**
   * Extract product data from card element
   * @param {HTMLElement} card - The product card DOM element
   * @returns {Object|null} - Extracted product data or null if invalid
   */
  function extractProductFromCard(card) {
    try {
      // Product Name
      let nameEl =
        card.querySelector(".best-product-name") ||
        card.querySelector(".trending-product-name") ||
        card.querySelector(".card-title-serif"); // Category cards have different class

      if (!nameEl) return null;
      const name = nameEl.textContent.trim();

      // Product Price
      // We need the *current* price (avoid old strikethrough prices)
      // Look for best-product-price within best-product-pricing first (if on sale), otherwise just best-product-price
      let priceText = "0.00";

      const pricingDiv =
        card.querySelector(".best-product-pricing") ||
        card.querySelector(".trending-product-pricing");

      if (pricingDiv) {
        // If there's a pricing div (meaning sale), get the LAST price element usually
        const allPrices = pricingDiv.querySelectorAll(
          ".best-product-price, .trending-product-price",
        );
        if (allPrices.length > 0) {
          priceText = allPrices[allPrices.length - 1].textContent.trim();
        }
      } else {
        // Standard price
        const priceEl =
          card.querySelector(".best-product-price") ||
          card.querySelector(".trending-product-price");
        if (priceEl) priceText = priceEl.textContent.trim();
      }

      // Clean price text (remove currency symbols like £ or $)
      const priceVal = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));

      return {
        name: name,
        price: isNaN(priceVal) ? 0 : priceVal,
      };
    } catch (error) {
      console.error("Error extracting product details", error);
      return null;
    }
  }

  // Attach click listeners to all product cards
  productCards.forEach((card) => {
    // Add a class that changes cursor to pointer to indicate clickability
    card.style.cursor = "pointer";

    card.addEventListener("click", (e) => {
      // Prevent default just in case it's wrapped in an <a> tag later
      // (but don't prevent if clicked element is explicitly intended to trigger something else)
      const product = extractProductFromCard(card);

      if (product) {
        // Do not navigate away if it's an <a> tag internally, unless desired
        e.preventDefault();
        addToCart(product);
      }
    });
  });

  // Initialize UI on load
  updateCartUI();
});
