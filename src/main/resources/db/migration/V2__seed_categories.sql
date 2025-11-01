INSERT INTO category (name, slug) VALUES
('Chips', 'chips'),
('Chocolates', 'chocolates'),
('Cookies', 'cookies'),
('Nuts & Seeds', 'nuts-seeds');

-- Chips
INSERT INTO product (category_id, name, slug, description, price_cents, image_url, rating)
VALUES
  ((SELECT id FROM category WHERE slug = 'chips'), 'Lays Classic Salted', 'lays-classic-salted', 'Classic salted potato chips', 4500, NULL, 4.50),
  ((SELECT id FROM category WHERE slug = 'chips'), 'Doritos Nacho Cheese', 'doritos-nacho-cheese', 'Corn chips with nacho cheese flavor', 5500, NULL, 4.20);

-- Chocolates
INSERT INTO product (category_id, name, slug, description, price_cents, image_url, rating)
VALUES
  ((SELECT id FROM category WHERE slug = 'chocolates'), 'Dairy Milk Silk', 'dairy-milk-silk', 'Silky smooth milk chocolate', 12000, NULL, 4.80),
  ((SELECT id FROM category WHERE slug = 'chocolates'), 'KitKat 4-Finger', 'kitkat-4-finger', 'Crisp wafer fingers covered with chocolate', 6000, NULL, 4.40);

-- Cookies
INSERT INTO product (category_id, name, slug, description, price_cents, image_url, rating)
VALUES
  ((SELECT id FROM category WHERE slug = 'cookies'), 'Oreo Original', 'oreo-original', 'Chocolate sandwich cookies with creme', 7000, NULL, 4.60);

-- Nuts & Seeds
INSERT INTO product (category_id, name, slug, description, price_cents, image_url, rating)
VALUES
  ((SELECT id FROM category WHERE slug = 'nuts-seeds'), 'Roasted Almonds 200g', 'roasted-almonds-200g', 'Lightly salted roasted almonds', 25000, NULL, 4.70);