export async function getCategories() {
  const res = await fetch('/api/categories')
  if (!res.ok) throw new Error('Failed to load categories')
  return res.json()
}

/**
 * Returns Spring Data Page:
 * {
 *   content: ProductDto[], totalElements, totalPages, number (page), size, ...
 * }
 */
export async function getProducts({ category, page = 0, size = 12, sort, direction, q } = {}) {
  const params = new URLSearchParams()
  params.set('page', page)
  params.set('size', size)
  if (category) params.set('category', category)
  if (sort) params.set('sort', sort)                 // if your controller expects comma style, also support:
  if (direction) params.set('direction', direction)  // either use direction=asc OR pass sort like "priceCents,asc"
  if (q) params.set('q', q)

  // IMPORTANT: backticks for template literal
  const res = await fetch(`/api/products?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}