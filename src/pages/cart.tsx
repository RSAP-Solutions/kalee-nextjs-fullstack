import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPageWithMeta } from "./_app";
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  getCartTotal,
  clearCart,
} from "@/utils/cart";
import { CartItem } from "@/types/product";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart: NextPageWithMeta = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCartItems(getCart());
    setIsLoading(false);

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartItems(getCart());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    setCartItems(getCart());
  };

  const handleRemoveItem = (productId: string) => {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
      removeFromCart(productId);
      setCartItems(getCart());
    }
  };

  const handleCheckout = () => {
    // For now, just show a message. This will be replaced with backend integration later.
    alert("Checkout functionality will be available soon!");
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
      setCartItems([]);
    }
  };

  const total = getCartTotal();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="text-center">
          <p className="text-slate-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="mx-auto max-w-2xl text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-slate-300" />
          <h1 className="mt-6 text-3xl font-semibold text-navy">
            Your cart is empty
          </h1>
          <p className="mt-4 text-slate-600">
            Start shopping to add items to your cart.
          </p>
          <Link href="/store" className="btn-primary mt-6">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto w-full">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
            Shopping Cart
          </h1>
          <button
            onClick={handleClearCart}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.product.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl bg-white p-6 shadow-card">
              <h2 className="mb-4 text-xl font-semibold text-navy">
                Order Summary
              </h2>
              <div className="space-y-3 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>
                    Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </span>
                  <span className="font-medium">
                    ${total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-lg font-semibold text-navy">
                <span>Total</span>
                <span className="text-tangerine">
                  ${total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-primary mt-6 w-full"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/store"
                className="btn-secondary mt-3 w-full text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemCard = ({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) => {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="card flex gap-4">
      <Link
        href={`/store/${product.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-200">
            <div className="h-8 w-8 rounded-full border-2 border-slate-400"></div>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link
              href={`/store/${product.slug}`}
              className="text-lg font-semibold text-navy hover:text-amber transition-colors"
            >
              {product.title}
            </Link>
            <p className="mt-1 text-tangerine font-bold">
              ${product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <button
            onClick={() => onRemove(product.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-sm font-semibold text-navy">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="text-lg font-semibold text-navy">
            ${itemTotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

Cart.meta = {
  title: "Shopping Cart | Kealee Construction Store",
  description: "Review your cart and proceed to checkout.",
};

export default Cart;

