DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

DROP TABLE IF EXISTS product, features, styles, related, photos, skus, cart CASCADE;

CREATE TABLE product (
  id SERIAL UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(300) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE features (
  id SERIAL UNIQUE NOT NULL,
  product_id INTEGER NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);
/*Good  default? === default style? integer*/
CREATE TABLE styles (
  id SERIAL UNIQUE NOT NULL,
  productId INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  sale_price VARCHAR(50),
  original_price VARCHAR(50) NOT NULL,
  default_style BOOLEAN NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE related (
  id SERIAL UNIQUE NOT NULL,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (current_product_id) REFERENCES product(id)
);

CREATE TABLE photos (
  id SERIAL  UNIQUE NOT NULL,
  styleId INTEGER NOT NULL,
  url VARCHAR(300) NOT NULL,
  thumbnail_url TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL UNIQUE NOT NULL,
  styleId INTEGER NOT NULL,
  size VARCHAR(20) NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE cart (
  id SERIAL NOT NULL,
  user_session INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  active INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


\COPY product FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/product.csv' WITH (FORMAT CSV, HEADER);
\COPY features FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/features.csv' WITH (FORMAT CSV, HEADER);
\COPY styles FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/styles.csv' WITH (FORMAT CSV, HEADER);
\COPY related FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/related.csv' WITH (FORMAT CSV, HEADER);
\COPY photos FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/photos.csv' WITH (FORMAT CSV, HEADER);
\COPY skus FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/skus.csv' WITH (FORMAT CSV, HEADER);
\COPY cart FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/cart.csv' WITH (FORMAT CSV, HEADER);
