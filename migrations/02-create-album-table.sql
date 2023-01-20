CREATE TABLE Album (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year int NOT NULL,
  artistId int not null
  );

  ALTER TABLE Album
ADD FOREIGN KEY (artistId) REFERENCES Artists(id);