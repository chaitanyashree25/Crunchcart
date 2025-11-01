import { useState, useEffect } from 'react';

export default function SortBar({ sort, direction, onChange }) {
  const [field, setField] = useState(sort || 'id');
  const [dir, setDir] = useState(direction || 'desc');

  useEffect(() => {
    setField(sort || 'id');
    setDir(direction || 'desc');
  }, [sort, direction]);

  const apply = () => onChange({ sort: field, direction: dir });

  return (
    <div className="row" style={{ margin: '10px 0 16px' }}>
      <label className="kicker">Sort by:</label>
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="badge"
        style={{ appearance: 'none' }}
        aria-label="Sort field"
      >
        <option value="id">Newest</option>
        <option value="priceCents">Price</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
      </select>

      <select
        value={dir}
        onChange={(e) => setDir(e.target.value)}
        className="badge"
        style={{ appearance: 'none' }}
        aria-label="Sort direction"
      >
        <option value="asc">Low → High / A → Z</option>
        <option value="desc">High → Low / Z → A</option>
      </select>

      <button className="badge" onClick={apply}>Apply</button>
    </div>
  );
}