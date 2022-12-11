package repo

import (
	db "dating-app/internal/db"
	"dating-app/pkg/models"
	"dating-app/pkg/utils"
)

type User models.User
type UserRepository models.UserInterface

func CreateUser(u *models.User) (int64, error) {
	res, err := db.Client.Exec(
		"INSERT INTO profile (email, password, name, gender, age) VALUES (?,?,?,?,?)",
		u.Email, u.Password, u.Name, u.Gender, u.Age)
	utils.CheckPanic(err, "")
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return id, nil
}

func GetUser(id int) (*models.User, error) {
	row := db.Client.QueryRow("SELECT * FROM profile WHERE id = ?", id)
	var u models.User
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
	if err != nil {
		return nil, err
	}
	err = row.Err()
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func GetAllUser() ([]*models.User, error) {
	rows, err := db.Client.Query("SELECT * FROM profile")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var users []*models.User
	for rows.Next() {
		var u models.User
		err = rows.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
		if err != nil {
			return nil, err
		}
		users = append(users, &u)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return users, nil
}
