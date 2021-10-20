CREATE DATABASE IF NOT EXISTS homework5;
USE homework5;

DROP TABLE IF EXISTS books;
CREATE TABLE books (
	id int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(48) UNIQUE NOT NULL
);

INSERT INTO books (id, title) VALUES 
(1, 'Hilary and Jackie'),
(2, 'Bereavement'),
(3, 'Dallas: War of the Ewings'),
(4, 'Dopamine');  

DROP TABLE IF EXISTS bookInfo;
CREATE TABLE bookInfo (
	id int PRIMARY KEY AUTO_INCREMENT,
    bookId int NOT NULL REFERENCES books(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	author varchar(48),
    yearPublished int,
    publisher varchar(48),
    pageCount int,
    msrp varchar(24)
);

INSERT INTO bookInfo (id, bookId, author, yearPublished, publisher, pageCount, msrp) VALUES
(1, 1, 'Mike Michalowicz', 2014, 'Kling-Braun', 660, '$34.99'),
(2, 2, 'Cyndia Lesek', 2012, 'Lakin-Quitzon', 159, '$26.99'),
(3, 3, 'Corissa Semour', 1998, 'Schiller-Gislason', 825, '$16.99'),
(4, 4, 'Billie Stamner', 2004, 'Gerald Publishing', 345, '$21.99');  

SELECT * FROM bookInfo;
