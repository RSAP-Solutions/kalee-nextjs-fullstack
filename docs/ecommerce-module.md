# E-Commerce Store Front Module

## Overview

This document describes the e-commerce store front functionality implemented for the Kealee Construction website. The module provides a complete shopping experience including product browsing, product details, shopping cart, and checkout preparation.

## Architecture

### Components Structure

```
src/
├── components/
│   └── Header.tsx (updated with Store Front CTA and cart icon)
├── pages/
│   ├── store.tsx (main store front page)
│   ├── store/
│   │   └── [slug].tsx (product detail page)
│   └── cart.tsx (shopping cart page)
├── data/
│   └── products.ts (product data and categories)
├── types/
│   └── product.ts (TypeScript type definitions)
├── utils/
│   └── cart.ts (localStorage cart management)
└── hooks/
    └── useCartCount.ts (cart count hook for header badge)
```

## Features

### 1. Store Front Page (`/store`)

**Location:** `src/pages/store.tsx`

**Features:**
- Category sidebar navigation (desktop)
- Category filter chips (mobile)
- Product grid with responsive layout
- Product sorting (Most popular, Name A-Z, Price Low-High, Price High-Low)
- Product cards with image, title, and price
- Category-based filtering
- URL query parameter support for category selection

**Categories:**
- All Products
- Energy Upgrades
- HVAC Services
- Plumbing Services
- Carpentry and Repairs
- Painting and Drywall
- Exterior Upgrades
- Electrical and Technology Services
- Accessibility Upgrades

### 2. Product Detail Page (`/store/[slug]`)

**Location:** `src/pages/store/[slug].tsx`

**Features:**
- Large product image display
- Product title and price
- Quantity selector with increment/decrement buttons
- "Add to Cart" button
- "Buy Now" button (adds to cart and redirects to cart page)
- Social sharing buttons (Facebook, Twitter)
- Product description
- "You May Also Like" section with related products
- Breadcrumb navigation

### 3. Shopping Cart Page (`/cart`)

**Location:** `src/pages/cart.tsx`

**Features:**
- Display all cart items with images
- Quantity adjustment per item
- Remove individual items
- Clear entire cart
- Order summary with subtotal
- Proceed to checkout button
- Continue shopping link
- Empty cart state with helpful message

### 4. Header Integration

**Location:** `src/components/Header.tsx`

**Changes:**
- Replaced "Call" CTA with "Store Front" button
- Added shopping cart icon with item count badge
- Cart icon links to `/cart` page
- Cart count updates in real-time
- Mobile menu includes Store Front and Cart links

## Data Management

### Product Data Structure

**Location:** `src/data/products.ts`

Products include:
- `id`: Unique identifier
- `title`: Product name
- `description`: Detailed product description
- `price`: Product price (number)
- `image`: Image path (currently placeholder paths)
- `category`: Category slug
- `slug`: URL-friendly identifier
- `inStock`: Stock availability

### Cart Management

**Location:** `src/utils/cart.ts`

**Functions:**
- `getCart()`: Retrieve cart from localStorage
- `saveCart()`: Save cart to localStorage and dispatch update event
- `addToCart(product, quantity)`: Add item to cart or update quantity
- `removeFromCart(productId)`: Remove item from cart
- `updateCartItemQuantity(productId, quantity)`: Update item quantity
- `getCartItemCount()`: Get total number of items in cart
- `getCartTotal()`: Calculate total cart value
- `clearCart()`: Empty the cart

**Storage:**
- Cart data is stored in browser localStorage under key: `kealee_cart`
- Cart updates trigger a custom `cartUpdated` event for real-time UI updates

## State Management

### Cart Count Hook

**Location:** `src/hooks/useCartCount.ts`

Custom React hook that:
- Tracks cart item count in real-time
- Listens for cart update events
- Returns current cart count for header badge display

**Usage:**
```tsx
const cartCount = useCartCount();
```

## TypeScript Types

**Location:** `src/types/product.ts`

**Types:**
- `Product`: Product structure
- `CartItem`: Cart item with product and quantity
- `ProductCategory`: Category structure

## Styling

The e-commerce module uses the existing Tailwind CSS configuration and design system:
- Colors: `navy`, `ocean`, `amber`, `tangerine`
- Components: `card`, `btn-primary`, `btn-secondary`
- Responsive breakpoints: `sm:`, `lg:`
- Consistent with site-wide design patterns

## Integration Points for Backend

### Current Implementation (localStorage)

The cart is currently managed client-side using localStorage. This allows for:
- Immediate functionality without backend dependencies
- Offline cart persistence
- Fast development iteration

### Future Backend Integration

When the backend API is ready, the following functions in `src/utils/cart.ts` should be updated:

1. **Cart Operations:**
   - Replace localStorage calls with API calls
   - Add authentication headers
   - Handle API errors gracefully

2. **Endpoints Expected:**
   ```
   GET    /api/cart              - Get user's cart
   POST   /api/cart/add           - Add item to cart
   PUT    /api/cart/update        - Update cart item quantity
   DELETE /api/cart/item/:id      - Remove cart item
   DELETE /api/cart/clear         - Clear cart
   POST   /api/cart/checkout      - Proceed to checkout
   ```

3. **Migration Strategy:**
   - Keep localStorage as fallback
   - Migrate existing localStorage cart on user login
   - Sync cart with backend on user authentication

## Product Images

**Current State:**
- Product images use placeholder paths (`/products/[name].jpg`)
- These paths need actual images to be added to the `public/products/` directory

**Required Images:**
- energy-starter-pack.jpg
- green-home-combo.jpg
- eco-efficiency-supreme.jpg
- hvac-system.jpg
- plumbing-upgrade.jpg
- carpentry-package.jpg
- paint-drywall.jpg
- exterior-renovation.jpg
- smart-home.jpg
- accessibility.jpg

**Fallback:**
- Products without images show a placeholder icon
- Styled to match the design system

## URL Structure

- **Store Front:** `/store`
- **Store with Category:** `/store?category=energy`
- **Product Detail:** `/store/[slug]` (e.g., `/store/energy-starter-pack`)
- **Shopping Cart:** `/cart`

## Browser Compatibility

- Requires localStorage support (all modern browsers)
- Uses Next.js routing
- Responsive design for mobile, tablet, and desktop

## Future Enhancements

1. **Product Search:** Add search functionality to the store
2. **Wishlist:** Allow users to save products for later
3. **Product Reviews:** Display customer reviews and ratings
4. **Inventory Management:** Show stock availability per item
5. **Checkout Process:** Full checkout flow with payment integration
6. **Order History:** Display past orders for logged-in users
7. **Product Recommendations:** AI-powered product suggestions
8. **Filters:** Additional filtering options (price range, features)
9. **Compare Products:** Side-by-side product comparison
10. **Promo Codes:** Discount code application at checkout

## Testing Checklist

- [ ] Add product to cart from product detail page
- [ ] Update quantity in cart
- [ ] Remove item from cart
- [ ] Clear entire cart
- [ ] Navigate between categories
- [ ] Sort products by different criteria
- [ ] Responsive design on mobile devices
- [ ] Cart persistence across page refreshes
- [ ] Cart count badge updates correctly
- [ ] Buy Now redirects to cart
- [ ] Empty cart state displays correctly
- [ ] Product detail page loads correctly
- [ ] Related products display correctly

## Dependencies

- `lucide-react`: For cart and social media icons
- `next`: For routing and page structure
- `react`: For component rendering
- `tailwindcss`: For styling

## Notes

- Cart state is managed entirely client-side (localStorage)
- No user authentication required for cart functionality
- Product data is currently static (can be moved to CMS/backend later)
- Checkout button currently shows an alert (to be replaced with checkout flow)

