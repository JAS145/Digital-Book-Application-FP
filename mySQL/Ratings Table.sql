CREATE TABLE ratings (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  book_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  score DECIMAL(10,1),
  comment TEXT,
  FOREIGN KEY (book_id) REFERENCES books(id) on update cascade on delete cascade,
  FOREIGN KEY (user_id) REFERENCES users(id) on update cascade on delete cascade
);


