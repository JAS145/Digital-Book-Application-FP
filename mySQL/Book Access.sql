create table book_access(
id int auto_increment primary key,
book_id int not null,
user_id int not null,
payment_id int not null ,
created_at DATE DEFAULT CURDATE(),
foreign key (user_id) references users(id) on update cascade,
foreign key (book_id) references books(id) on update cascade);
-- foreign key (payment_id) references payment(id) on update cascade on delete cascade  
-- );
