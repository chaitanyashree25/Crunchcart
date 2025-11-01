import { useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer({ open, onClose }) {
  const { items, inc, dec, removeItem, clear, subtotalCents, totalCount } = useCart();

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Cart">
        <div className="drawer__header">
          <h3>Cart · {totalCount}</h3>
          <button className="badge" onClick={onClose}>✕</button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <p className="kicker">Your cart is empty.</p>
          ) : (
            <ul className="drawer__list">
              {items.map(it => (
                <li key={it.id} className="drawer__item">
                  <div className="drawer__thumb">
                    {it.imageUrl ? (
                      <img src={it.imageUrl} alt={it.name} />
                    ) : (
                      <span className="kicker">No image</span>
                    )}
                  </div>
                  <div className="drawer__meta">
                    <div className="title" style={{ marginBottom: 4 }}>{it.name}</div>
                    <div className="kicker">₹ {(it.priceCents / 100).toFixed(2)}</div>

                    <div className="qtyrow">
                      <button className="badge" onClick={() => dec(it.id)}>-</button>
                      <span className="qty">{it.qty}</span>
                      <button className="badge" onClick={() => inc(it.id)}>+</button>

                      <button
                        className="badge"
                        onClick={() => removeItem(it.id)}
                        style={{ marginLeft: 'auto' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="drawer__footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>₹ {(subtotalCents / 100).toFixed(2)}</strong>
          </div>
          <div className="row">
            <button className="badge" onClick={clear} disabled={items.length === 0}>Clear</button>
            <button className="cta" disabled={items.length === 0} style={{ marginLeft: 'auto' }}>
              Checkout →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}