import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar({ onSearch = () => {}, onOpenCart = () => {} }) {
  const [q, setQ] = useState('');
  const timer = useRef(null);
  const { totalCount } = useCart();

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { onSearch(q.trim() || null); }, 300);
    return () => clearTimeout(timer.current);
  }, [q]);

  const submit = (e) => { e.preventDefault(); onSearch(q.trim() || null); };
  const clear = () => { setQ(''); onSearch(null); };

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <span className="nav__logo">🍪</span>
          <span className="nav__title">Crunchcart</span>
        </div>

        <form onSubmit={submit} className="nav__search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search snacks…"
            aria-label="Search snacks"
          />
          {q && <button type="button" onClick={clear} title="Clear search">✕</button>}
          <button type="submit">Search</button>
        </form>

        <div className="nav__actions">
          <button className="badge">Sign in</button>
          <button className="badge" onClick={onOpenCart}>
            Cart · {totalCount}
          </button>
        </div>
      </div>
    </header>
  );
}