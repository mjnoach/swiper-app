-- +migrate Up

CREATE TABLE profile (
	id int NOT NULL AUTO_INCREMENT,
	email text NOT NULL,
	password text NOT NULL,
	name text NOT NULL,
	gender text NOT NULL,
	age integer NOT NULL,
	PRIMARY KEY (id)
);

-- +migrate Down

DROP TABLE profile;
