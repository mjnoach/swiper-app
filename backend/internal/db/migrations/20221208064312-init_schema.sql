
-- +migrate Up
CREATE TABLE profile (
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

-- CREATE TABLE "userX" (
-- 	id int
-- );

-- -- create table if not exists person (id int AUTO_INCREMENT,first_name varchar(100), last_name varchar(100), created_at datetime, updated_at datetime, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- -- CREATE TABLE IF NOT EXISTS user (
-- --   `id` int(11) NOT NULL AUTO_INCREMENT, 
-- --   `email` varchar(100) NOT NULL,
-- --   `password` varchar(100) NOT NULL,
-- --   `name` varchar(100) NOT NULL,
-- --   `gender` varchar(100) NOT NULL,
-- --   `age` varchar(100) NOT NULL,
-- --   `last_name` varchar(100) NOT NULL, 
-- --   `created_at` datetime NOT NULL, 
-- --   `updated_at` datetime NOT NULL, 
-- --   PRIMARY KEY (`id`) 
-- -- ) 
-- -- ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- IF NOT EXISTS (
--   SELECT *
--   FROM INFORMATION_SCHEMA.TABLES
--   WHERE TABLE_SCHEMA = 'dating_app'
--   AND TABLE_NAME = 'user'
-- )
-- CREATE TABLE user (
--   `id` int(11) NOT NULL AUTO_INCREMENT, 
--   `email` varchar(100) NOT NULL,
--   `password` varchar(100) NOT NULL,
--   `name` varchar(100) NOT NULL,
--   `gender` varchar(100) NOT NULL,
--   `age` varchar(100) NOT NULL,
--   `last_name` varchar(100) NOT NULL, 
--   `created_at` datetime NOT NULL, 
--   `updated_at` datetime NOT NULL, 
--   PRIMARY KEY (`id`) 
-- )
-- GO;


-- +migrate Down
DROP TABLE profile;
