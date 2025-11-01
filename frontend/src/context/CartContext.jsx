import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('cart:v1', []);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          priceCents: product.priceCents,
          imageUrl: product.imageUrl || null,
          qty: qty
        }
      ];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const setQty = (id, qty) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  };

  const inc = (id) => setItems(prev => prev.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id) => setItems(prev => prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));

  const clear = () => setItems([]);

  const totalCount = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotalCents = useMemo(() => items.reduce((s, i) => s + i.priceCents * i.qty, 0), [items]);

  const value = useMemo(() => ({
    items, addItem, removeItem, setQty, inc, dec, clear, totalCount, subtotalCents
  }), [items, subtotalCents, totalCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}