-- OAuth2.0 SCHEMA
CREATE DATABASE rtce;
CREATE TABLE oauth (
  id SERIAL,
  user_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  image_link VARCHAR(255),
  create_time TIMESTAMP,
  oauth_provider VARCHAR(255),
  access_token VARCHAR(255),
  refresh_token VARCHAR(255),
  expiry_date TIMESTAMP
);

-- INSERT INTO oauth(first_name, last_name, oauth_provider) VALUES ('rishabh', 'malhotra', 'google');

-- SELECT * FROM oauth where first_name = "Rishabh"

-- SELECT {COLNAME} FROM {TABLENAME} WHERE {CONDITION}

-- update  enrollments set year = 2015 where id >= 20 and id <= 100;


