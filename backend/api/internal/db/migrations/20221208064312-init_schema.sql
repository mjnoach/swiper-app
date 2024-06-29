-- +migrate Up

CREATE TABLE Users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email text NOT NULL,
	password text NOT NULL,
	name text NOT NULL,
	gender text NOT NULL,
	age integer NOT NULL,
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Swipes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	swipeFrom INT NOT NULL,
	swipedUser INT NOT NULL,
	preference text NOT NULL,
	FOREIGN KEY (swipeFrom) REFERENCES Users(id),
	FOREIGN KEY (swipedUser) REFERENCES Users(id)
);

-- +migrate Down

DROP TABLE Users;
DROP TABLE Swipes;
