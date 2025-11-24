import { useState, useEffect, FormEvent } from "react";
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

type ShippingFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

const emptyShippingForm: ShippingFormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

const shippingMethods = [
  { id: "standard", label: "Standard (5-7 days)", eta: "Free" },
  { id: "expedited", label: "Expedited (2-3 days)", eta: "$29.00" },
];

const Cart: NextPageWithMeta = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shippingForm, setShippingForm] = useState<ShippingFormState>(emptyShippingForm);
  const [shippingSaved, setShippingSaved] = useState(false);
  const [shippingMessage, setShippingMessage] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string>(shippingMethods[0]?.id ?? "standard");

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
    alert(
      "Stripe checkout is not connected yet. This flow is a frontend mock until backend + Stripe credentials are available."
    );
  };

  const handleShippingChange = (field: keyof ShippingFormState, value: string) => {
    setShippingForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setShippingSaved(false);
    setShippingMessage(null);
  };

  const handleShippingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShippingSaved(true);
    setShippingMessage("Shipping info staged locally. Connect Stripe + backend to persist orders.");
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
      setCartItems([]);
    }
  };

  const total = getCartTotal();
  const shippingCostLabel = shippingMethods.find((method) => method.id === selectedShipping)?.eta ?? "—";

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
          <div className="space-y-6">
            <section className="rounded-xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber">Step 1</p>
                  <h2 className="text-xl font-semibold text-navy">Shipping Information</h2>
                </div>
                <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                  Mock until Stripe hookup
                </span>
              </div>
              <form className="mt-6 grid gap-4" onSubmit={handleShippingSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-600">
                    Full Name
                    <input
                      type="text"
                      value={shippingForm.fullName}
                      onChange={(event) => handleShippingChange("fullName", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="Jordan Williams"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-600">
                    Email
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(event) => handleShippingChange("email", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-600">
                    Phone
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(event) => handleShippingChange("phone", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="(555) 555-1234"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-600">
                    Address
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(event) => handleShippingChange("address", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="1220 19th St NW, Suite 200"
                    />
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="text-sm font-semibold text-slate-600">
                    City
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(event) => handleShippingChange("city", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="Washington"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-600">
                    State
                    <input
                      type="text"
                      value={shippingForm.state}
                      onChange={(event) => handleShippingChange("state", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="DC"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-600">
                    Postal Code
                    <input
                      type="text"
                      value={shippingForm.postalCode}
                      onChange={(event) => handleShippingChange("postalCode", event.target.value)}
                      className="mt-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                      placeholder="20036"
                    />
                  </label>
                </div>

                <div className="grid gap-3">
                  <p className="text-sm font-semibold text-slate-600">Shipping Method</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex cursor-pointer flex-col rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          selectedShipping === method.id
                            ? "border-amber bg-amber/5 text-navy"
                            : "border-slate-200 text-slate-600 hover:border-ocean"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={(event) => setSelectedShipping(event.target.value)}
                          className="sr-only"
                        />
                        {method.label}
                        <span className="text-xs font-medium text-slate-500">{method.eta}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" className="btn-primary">
                    Save shipping details (Mock)
                  </button>
                  {shippingMessage ? (
                    <p className="text-sm font-semibold text-amber">{shippingMessage}</p>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Data stays in this tab until real Stripe checkout is wired up.
                    </p>
                  )}
                </div>
              </form>
            </section>

            {/* Cart Items */}
            <section className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </section>
          </div>

          {/* Order Summary + Payment Placeholder */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber">Step 2</p>
                  <h2 className="text-xl font-semibold text-navy">Review Order</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  Frontend mock
                </span>
              </div>
              <div className="mt-4 space-y-3 border-b border-slate-200 pb-4">
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
                  <span className="font-medium">{shippingCostLabel}</span>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                  Shipping info {shippingSaved ? "ready" : "pending"}. Values reset on refresh until backend is connected.
                </div>
              </div>
              <div className="mt-4 flex justify-between text-lg font-semibold text-navy">
                <span>Estimated Total</span>
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
                Proceed to Mock Payment
              </button>
              <Link
                href="/store"
                className="btn-secondary mt-3 w-full text-center"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber">Step 3</p>
              <h3 className="mt-2 text-lg font-semibold text-navy">Payment (Stripe Placeholder)</h3>
              <p className="mt-3 text-sm text-slate-600">
                This button will launch Stripe Checkout once API keys + backend webhook are connected.
              </p>
              <ul className="mt-4 space-y-2 text-left text-xs text-slate-500">
                <li>• Create Checkout Session</li>
                <li>• Redirect customer to Stripe-hosted payment</li>
                <li>• Listen for webhook to confirm order</li>
              </ul>
              <button
                type="button"
                disabled
                className="btn-secondary mt-5 w-full cursor-not-allowed border-slate-200 text-slate-400"
              >
                Stripe integration pending
              </button>
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

