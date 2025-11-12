DROP TABLE IF EXISTS creature;
DROP TABLE IF EXISTS users;

CREATE TABLE creature (
  id UUID PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  species VARCHAR(250) NOT NULL,
  planet VARCHAR(250) NOT NULL,
  danger_level VARCHAR(250) NOT NULL,
  age NUMERIC NOT NULL,
  description VARCHAR(250) NOT NULL,
  special_abilities VARCHAR(250) NOT NULL,
  image CLOB NOT NULL,
  rarity VARCHAR(250) NOT NULL,
  is_adopted VARCHAR(250) NOT NULL,
  adopted_date TIMESTAMP,
  adopted_by VARCHAR(250)
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    role VARCHAR(250) NOT NULL
);
