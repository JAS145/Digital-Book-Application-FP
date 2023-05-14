create table users (
id int auto_increment primary key,
role_id int not null,
name varchar(150) not null,
password varchar (50) not null unique,
email varchar (100) not null unique,
username varchar(150) not null,
address text not null,
join_date date not null,
phone_number varchar (13) not null,
FOREIGN KEY (role_id) REFERENCES roles(id) on update cascade
);

