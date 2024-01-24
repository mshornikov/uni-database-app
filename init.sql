drop table if exists doctor cascade;
create table doctor (
	full_name VARCHAR(255) not null,
	sex varchar(3) not null,
	profile text not null,
	category text not null,
	phone_number varchar(15) not null,
	experience_years integer,
    Primary key (full_name)
);

begin work;
lock table doctor in access exclusive mode;
insert into doctor
(full_name, sex, profile, category, phone_number, experience_years)
values
('Иванов Иван Иванович', 'муж', 'Стоматолог', 'Высшая', '+79108049889', 20),
('Степанова Елена Григорьевна', 'жен', 'Стоматолог', 'Средняя', '+79998249389', 10);
commit work;

drop table if exists room cascade;
create table room (
	number integer not null,
	floor_number integer not null,
	features text default null,
    Primary key (number)
);

begin work;
lock table room in access exclusive mode;
insert into room
(number, floor_number, features)
values
(1, 1, 'Сломан стул'),
(2, 1, 'Отличные инструмент');
commit work;

drop table if exists patient cascade;
create table patient (
	full_name VARCHAR(255) not null,
	birthday date not null,
	sex varchar(3) not null,
	phone_number varchar(15) not null,
	passport varchar(10) not null,
	snils varchar(11) not null,
    Primary key (passport)
);

begin work;
lock table patient in access exclusive mode;
insert into patient
(full_name, birthday, sex, phone_number, passport, snils)
values
('Петров Виталий Фёдорович', '2002-12-29', 'муж', '+79108098769', '2869787878', '12345678901'),
('Петрова Ирина Анатольевна', '2004-05-12', 'жен', '+79128457054', '2869989898', '12345678902');
commit work;

drop table if exists visit cascade;
create table visit (
	visit_date date not null,
	duration_in_minutes integer not null,
    patient_passport varchar(10) not null,
    doctor_name varchar(255) not null,
    room_number integer not null,
    Primary key (visit_date, patient_passport, doctor_name, room_number),
    Foreign key (patient_passport) references patient(passport) on delete cascade,
    Foreign key (doctor_name) references doctor(full_name),
    Foreign key (room_number) references room(number)
);

begin work;
lock table visit in access exclusive mode;
insert into visit
(visit_date, duration_in_minutes, patient_passport, doctor_name, room_number)
values
('2024-01-23', 60, '2869989898', 'Иванов Иван Иванович', 1),
('2024-01-24', 120, '2869787878', 'Иванов Иван Иванович', 1);
commit work;

drop table if exists service cascade;
create table service (
	name text not null,
	description text default null,
	price numeric not null,
    Primary key (name)
);

begin work;
lock table service in access exclusive mode;
insert into service
(name, description, price)
values
('Лечение кариеса', 'Лечение кариеса', 1200),
('Осмотр', 'Осмотр у стоматолога', 1000);
commit work;

drop table if exists service_list cascade;
create table service_list (
    visit_date date not null,
    patient_passport varchar(10) not null,
    doctor_name varchar(255) not null,
    room_number integer not null,
    service_name text not null,
    Primary key (visit_date, patient_passport, doctor_name, room_number, service_name),
    Foreign key (visit_date, patient_passport, doctor_name, room_number) references visit(visit_date, patient_passport, doctor_name, room_number) on delete cascade,
    Foreign key(service_name) references service(name)
);

begin work;
lock table service_list in access exclusive mode;
insert into service_list
(visit_date, patient_passport, doctor_name, room_number, service_name)
values
('2024-01-23', '2869989898', 'Иванов Иван Иванович', 1, 'Осмотр'),
('2024-01-23', '2869989898', 'Иванов Иван Иванович', 1, 'Лечение кариеса'),
('2024-01-24', '2869787878', 'Иванов Иван Иванович', 1, 'Осмотр');
commit work;
