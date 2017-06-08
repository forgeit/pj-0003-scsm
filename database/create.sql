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

create table moto
(
	id int primary key auto_increment,
	nome varchar(255) not null,
	imagem text,
	id_revenda integer not null,
	id_marca integer not null,
	ano integer not null,
	valor decimal(9,2) not null,
	observacoes text,
	foreign key (id_revenda) references revenda (id),
	foreign key (id_marca) references marca (id)
);

delete from moto;
insert into moto 
(nome, imagem, id_revenda, id_marca, ano, valor, observacoes)
values 
('CG 125', 'server/application/views/motos/1.jpg', 1, 5, 2007, 3500, 'Moto em perfeito estado.'),
('Factor 125', 'server/application/views/motos/2.jpg', 1, 11, 2009, 4500, 'Moto em perfeito estado.'),
('Twister 250', 'server/application/views/motos/3.jpg', 1, 5, 2009, 6500, 'Moto em perfeito estado.'),
('Biz 100', 'server/application/views/motos/4.jpg', 1, 5, 2005, 2500, 'Moto em perfeito estado.');