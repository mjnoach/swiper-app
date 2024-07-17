-- +migrate Up

INSERT INTO Users (id, email, password, name, gender, age)
VALUES
	(1, 'test1@mail.com', 'test1@mail.com', 'Casey Lee', 'female', 43),
	(2, 'test2@mail.com', 'test2@mail.com', 'Drew Kim', 'male', 53),
	(3, 'test3@mail.com', 'test3@mail.com', 'Riley Lewis', 'female', 44),
	(4, 'test4@mail.com', 'test4@mail.com', 'Riley Lewis', 'male', 41),
	(5, 'test5@mail.com', 'test5@mail.com', 'Casey Lee', 'female', 65),
	(6, 'test6@mail.com', 'test6@mail.com', 'Drew Kim', 'male', 19),
	(7, 'test7@mail.com', 'test7@mail.com', 'Morgan Davis', 'male', 58),
	(8, 'test8@mail.com', 'test8@mail.com', 'Jamie Taylor', 'female', 54),
	(9, 'test9@mail.com', 'test9@mail.com', 'Taylor Johnson', 'female', 29);

INSERT INTO Swipes (swipeFrom, swipedUser, preference)
VALUES
	(2, 1, 'yes'),
	(3, 1, 'yes'),
	(4, 1, 'no'),
	(5, 1, 'no'),
	(6, 1, 'yes'),
	(7, 1, 'no'),
	(8, 1, 'no'),
	(9, 1, 'yes');

-- +migrate Down
