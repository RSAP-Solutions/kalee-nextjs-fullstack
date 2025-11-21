import { useState, useEffect } from "react";
import { getCartItemCount } from "@/utils/cart";

export const useCartCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setCount(getCartItemCount());
    };

    // Initial count
    updateCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return count;
};

