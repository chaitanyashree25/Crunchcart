-- Users (for later auth)
CREATE TABLE app_user (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Catalog
CREATE TABLE category (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) UNIQUE NOT NULL
);

CREATE TABLE product (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES category(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  rating NUMERIC(3,2) DEFAULT 0
);

-- Inventory
CREATE TABLE inventory (
  product_id BIGINT PRIMARY KEY REFERENCES product(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  reserved INTEGER NOT NULL DEFAULT 0
);