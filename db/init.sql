CREATE SCHEMA haufe;

CREATE TABLE haufe.users(
    id varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY(id)
);