
create database Final_Project;
use Final_Project;
create table Publishers (
id int auto_increment primary key,
name varchar(150) not null,
password varchar (50) not null unique,
email varchar (100) not null unique,
username varchar(150) not null,
address text not null,
join_date date not null,
phone_number varchar (13) not null
);

select * from publishers, books.id as nomor_buku  left join books on books.publisher_id = publishers.id group by publishers.id;


select * from publishers;
