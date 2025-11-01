import { useEffect, useState } from 'react'
import { getProducts } from '../api.js'
import { useCart } from '../context/CartContext.jsx'

function ProductSkeletonCard() {
  return (
    <li className="card">
      <div className="skel thumb"></div>
      <div className="skel line" style={{ width: '70%' }}></div>
      <div className="skel line" style={{ width: '40%' }}></div>
      <div className="skel line" style={{ width: '55%' }}></div>
    </li>
  );
}

export default function Products({ category = null, query = null, sort = 'id', direction = 'desc' }) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [size] = useState(12)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const { addItem } = useCart();

  useEffect(() => { setPage(0) }, [category, query, sort, direction])

  useEffect(() => {
    setLoading(true)
    getProducts({ category, page, size, sort, direction, q: query || undefined })
      .then(p => {
        const content = Array.isArray(p?.content) ? p.content : []
        setItems(content)
        setTotalPages(p?.totalPages ?? 0)
        setErr(null)
      })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false))
  }, [category, query, page, size, sort, direction])

  if (err) return <p style={{ color: 'crimson' }}>Error: {err}</p>

  return (
    <div>
      {loading ? (
        <ul className="grid" style={{ padding: 0, margin: 0 }}>
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeletonCard key={i} />)}
        </ul>
      ) : items.length === 0 ? (
        <p>
          No products found
          {query ? <> for “{query}”</> : null}
          {category ? <> in “{category}”</> : null}.
        </p>
      ) : (
        <>
          <ul className="grid" style={{ padding: 0, margin: 0 }}>
            {items.map(p => (
              <li key={p.id} className="card">
                <div className="thumb">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={`${p.name} image`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
                    />
                  ) : (
                    <span>Image coming soon</span>
                  )}
                </div>

                <div style={{ marginTop: 10 }}>
                  <div className="title">{p.name}</div>
                  <div className="kicker">{p.categoryName}</div>

                  <div className="price-row">
                    <div className="price">₹ {(p.priceCents / 100).toFixed(2)}</div>
                    {typeof p.rating === 'number' && p.rating > 0 && (
                      <div className="rating">★ {p.rating.toFixed(1)}</div>
                    )}
                  </div>

                  <button className="cta" onClick={() => addItem(p)}>Add to cart</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="row" style={{ marginTop: 18 }}>
            <button className="badge" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page <= 0}>
              ← Prev
            </button>
            <span className="kicker">Page {page + 1} of {Math.max(1, totalPages)}</span>
            <button className="badge" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}