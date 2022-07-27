

CREATE TABLE products (
  id SERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(300) NOT NULL,
  description VARCHAR(300) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(50) NOT NULL
  PRIMARY KEY (id)
);

CREATE TABLE features (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE styles (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  original_price VARCHAR(50) NOT NULL,
  sale_price VARCHAR(50)
  "default?" BOOLEAN
  PRIMARY KEY (id)
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE related (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  related VARCHAR[] NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE photos (
  id SERIAL NOT NULL,
  style_id INTEGER NOT NULL,
  url VARCHAR(100) NOT NULL,
  thumbnail_url VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL NOT NULL,
  style_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  size VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

