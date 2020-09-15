DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
use burgers_db;

create table burgers(
    id integer auto_increment NOT NULL,
    burger_name VARCHAR(40),
    devoured boolean,
    PRIMARY KEY(id)
)