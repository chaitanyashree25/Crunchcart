import { useState } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/Navbar.jsx';
import Categories from './components/Categories.jsx';
import SortBar from './components/SortBar.jsx';
import Products from './components/Products.jsx';
import CartDrawer from './components/CartDrawer.jsx';

export default function App() {
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState(null);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [cartOpen, setCartOpen] = useState(false);

  const handleSearch = (q) => setQuery(q || null);
  const handleSortChange = ({ sort, direction }) => {
    setSort(sort || 'id');
    setDirection(direction || 'desc');
  };

  return (
    <CartProvider>
      <Navbar onSearch={handleSearch} onOpenCart={() => setCartOpen(true)} />
      <div className="container">
        <h1>Crunchcart 🛒</h1>

        <h2>Snack Categories</h2>
        <Categories selected={category} onSelect={setCategory} />

        <SortBar sort={sort} direction={direction} onChange={handleSortChange} />

        <div className="row" style={{ marginTop: 10 }}>
          <h2 style={{ marginRight: 'auto' }}>Products</h2>
        </div>
        <Products category={category} query={query} sort={sort} direction={direction} />
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}