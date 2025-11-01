import { useEffect, useState } from 'react';
import { getCategories } from '../api.js';

export default function Categories({ selected = null, onSelect = () => {} }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="badge skel" style={{ width: 60, height: 28 }} />
        <div className="badge skel" style={{ width: 90, height: 28 }} />
        <div className="badge skel" style={{ width: 110, height: 28 }} />
      </div>
    );
  }
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>;

  return (
    <div className="row" role="listbox" aria-label="Categories">
      <button
        className={`badge ${selected == null ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`badge ${selected === cat.slug ? 'active' : ''}`}
          onClick={() => onSelect(cat.slug)}
          title={cat.slug}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}