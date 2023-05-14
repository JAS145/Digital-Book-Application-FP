create table payment(
id int auto_increment primary key,
user_id int not null,
book_id int not null,
amount int,
status enum ("completed", "pending", "failed"),
payment_date date not null,
created_at DATE DEFAULT CURDATE(), 
foreign key (user_id) references users(id) on update cascade,
foreign key (book_id) references books(id) on update cascade
);


drop table payment;
