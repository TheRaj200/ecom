import { createContext, useContext, useState, useEffect } from "react";

const ContextStore = createContext();

export const Provider = ({ children }) => {
  // Cart state persisted with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  // Drawer / modal visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: (updated[existingItemIndex].quantity || 1) + 1,
        };
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Toast alert
    setToastMessage(`"${product.title.slice(0, 24)}..." added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Update product quantity (+1 / -1)
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove single product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Derived counts
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <ContextStore.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
};

export const useStore = () => {
  const context = useContext(ContextStore);
  if (!context) {
    throw new Error("useStore must be used within a Provider");
  }
  return context;
};

export default Provider;
