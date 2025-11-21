import { CartItem, Product } from "@/types/product";

const CART_STORAGE_KEY = "kealee_cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
};

export const updateCartItemQuantity = (
  productId: string,
  quantity: number
): void => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.product.id === productId);

  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const clearCart = (): void => {
  saveCart([]);
};

