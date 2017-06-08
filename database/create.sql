drop database motoscs if exists;

create database motoscs;

CREATE TABLE marca
(
	id int primary key auto_increment,
	nome varchar(255) not null
);

insert into marca
(nome)
values
('BMW'),
('Dafra Motos'),
('Ducati'),
('Harley-Davidson'),
('Honda'),
('Kasinski'),
('Kawasaki'),
('KTM'),
('Suzuki'),
('Triumph'),
('Yamaha');

create table revenda
(
	id int primary key auto_increment,
	nome varchar(255) not null,
	cidade varchar(255),
	bairro varchar(255),
	endereco varchar(255),
	telefone varchar(15),
	email varchar(255) not null,
	site varchar(255),
	login varchar(255) not null,
	senha varchar(255) not null,
	facebook varchar(255),
	imagem text
);

insert into revenda
(nome, email, login, senha)
values 
('Kaskar Motos', 'kaskar@gmail.com', 'kaskar', '81dc9bdb52d04dc20036dbd8313ed055'),
('Multy Motos', 'multy@gmail.com', 'multy', '81dc9bdb52d04dc20036dbd8313ed055'),
('CB Motos', 'cb@gmail.com', 'cb', '81dc9bdb52d04dc20036dbd8313ed055'),
('Ki Motos', 'ki@gmail.com', 'ki', '81dc9bdb52d04dc20036dbd8313ed055');