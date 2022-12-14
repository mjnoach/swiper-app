-- +migrate Up

CREATE TABLE profile (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email text NOT NULL,
	password text NOT NULL,
	name text NOT NULL,
	gender text NOT NULL,
	age integer NOT NULL
);

CREATE TABLE swipe (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user INT NOT NULL,
	profile INT NOT NULL,
	preference text NOT NULL,
	FOREIGN KEY (user) REFERENCES profile(id),
	FOREIGN KEY (profile) REFERENCES profile(id)
);

-- +migrate Down

DROP TABLE profile;
DROP TABLE swipe;
