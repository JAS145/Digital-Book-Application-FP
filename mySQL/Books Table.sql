CREATE TABLE books (
user_id int not null,
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  publisher VARCHAR(255),
  isbn VARCHAR(13),
  publication_date DATE,
  category VARCHAR(255),
  price DECIMAL(10,2),
  languages VARCHAR(255),
  keywords VARCHAR(255),
  image_url VARCHAR(255),
  file_url VARCHAR(255),
  foreign key (user_id) references users(id) On delete cascade on update cascade);


