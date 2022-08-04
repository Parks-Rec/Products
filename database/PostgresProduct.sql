DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

DROP TABLE IF EXISTS product, features, styles, related, photos, skus, cart CASCADE;

CREATE TABLE product (
  id SERIAL  NOT NULL,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(300) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE features (
  id SERIAL  NOT NULL,
  product_id INTEGER ,
  feature VARCHAR(50) ,
  value VARCHAR(50) ,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);
/*Good  default? === default style? integer*/
CREATE TABLE styles (
  id SERIAL  NOT NULL,
  productId INTEGER,
  name VARCHAR(50),
  sale_price VARCHAR(50),
  original_price VARCHAR(50),
  default_style BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE related (
  id SERIAL  NOT NULL,
  current_product_id INTEGER,
  related_product_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (current_product_id) REFERENCES product(id)
);

CREATE TABLE photos (
  id SERIAL   NOT NULL,
  styleId INTEGER,
  url VARCHAR(300),
  thumbnail_url TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL  NOT NULL,
  styleId INTEGER,
  size VARCHAR(20),
  quantity INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE cart (
  id SERIAL NOT NULL,
  user_session INTEGER NOT NULL,
  product_id INTEGER,
  active INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


\COPY product FROM './database/CSVdata/product.csv' WITH (FORMAT CSV, HEADER);
\COPY features FROM './database/CSVdata/features.csv' WITH (FORMAT CSV, HEADER);
\COPY styles FROM './database/CSVdata/styles.csv' WITH (FORMAT CSV, HEADER);
\COPY related FROM './database/CSVdata/related.csv' WITH (FORMAT CSV, HEADER);
\COPY photos FROM './database/CSVdata/photos.csv' WITH (FORMAT CSV, HEADER);
\COPY skus FROM './database/CSVdata/skus.csv' WITH (FORMAT CSV, HEADER);
\COPY cart FROM './database/CSVdata/cart.csv' WITH (FORMAT CSV, HEADER);


CREATE INDEX product_product_id_index ON product(id);

CREATE INDEX features_product_id_index ON features(product_id);

CREATE INDEX styles_styleId_index ON styles(id);

CREATE INDEX styles_productId_index ON styles(productId);

CREATE INDEX skus_styleId_index ON skus(styleId);

CREATE INDEX photos_styleId_index ON photos(styleId);

CREATE INDEX related_current_product_id_index ON related(current_product_id);