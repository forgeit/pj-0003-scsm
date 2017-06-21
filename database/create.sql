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

alter table revenda modify imagem longtext;

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

alter table moto add column img_aux_01 longtext;
alter table moto add column img_aux_02 longtext;
alter table moto add column img_aux_03 longtext;
alter table moto add column img_aux_04 longtext;
alter table moto modify imagem longtext;

create table mensagem
(
    id int primary key auto_increment,
    nome varchar(255) not null,
    email varchar(255),
    texto text not null,
    visualizado boolean default false,
    id_revenda int not null,
    id_moto int not null,
    foreign key (id_revenda) references revenda (id),
    foreign key (id_moto) references moto (id)
);