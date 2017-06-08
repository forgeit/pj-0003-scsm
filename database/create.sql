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