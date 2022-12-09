package repo

import (
	db "dating-app/internal/db"
	"dating-app/pkg/models"
	"log"
)

type User models.User
type UserRepository models.UserRepository

func CreateUser(u *models.User) (int64, error) {
	log.Printf("🚀 db.Client %v", db.Client)
	// log.Fatalf("🚀 %v", db.Client)
	// log.Println(reflect.TypeOf(u), u)

	res, err := db.Client.Exec(
		"INSERT INTO user (email, password, name, gender, age) VALUES (?,?,?,?,?)",
		u.Email, u.Password, u.Name, u.Gender, u.Age)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return id, nil
}

func GetAllUser() ([]*User, error) {
	var users []*User
	rows, err := db.Client.Query("SELECT * FROM profile")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var u *User
		err = rows.Scan(u.ID, u.Email, u.Password, u.Name, u.Gender, u.Age)
		if err != nil {
			return users, err
		}
		users = append(users, u)
	}
	err = rows.Err()
	if err != nil {
		return users, err
	}
	defer rows.Close()
	return users, nil
}
